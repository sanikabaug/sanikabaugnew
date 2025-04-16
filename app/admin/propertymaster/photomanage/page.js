"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'

export default function Home() {

  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState('');

  const [selectedImageUrls, setSelectedImageUrls] = useState([]);

  const [imageUrls, setImageUrls] = useState([]);

  const searchParams = useSearchParams();
  const hotel_id = searchParams.get('hotel_id');
  const hotel_name = searchParams.get('hotel_name');

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  let hotelName = capitalize_each_word(hotel_name) + "-" + hotel_id.toString();

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);

  //const [imgRes, setImgRes] = useState();
  const [fileExtension, setFileExtension] = useState();

  const [hotelImgs, setHotelImgs] = useState();

  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();

  const [roomResult, setRoomResult] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [roomName, setRoomName] = useState();

  const [currentRoomImage, setCurrentRoomImage] = useState();

  const initialFxn = async () => {
    try {

      const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      console.log("Property Rooms: ", result.dataActive);

      setRoomResult(result.dataActive);

      if (result && result.dataActive.length > 0 && !selectedRoom) {
        const newElement = {
          id: "PM00001",
          room_name: "Property Main",
        };
        result.dataActive.unshift(newElement);
        setSelectedRoomId(result.dataActive[0].id);
        setSelectedRoom(result.dataActive[0].room_name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialFxn()
  }, [])

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append('files', file);
  //   });
  //   formData.append('folder', folder);

  //   const response = await fetch('/api/upload', {
  //     method: 'POST',
  //     body: formData
  //   });

  //   const data = await response.json();
  //   console.log(data);
  // };



  const handleUpload = async () => {

    console.log("File and folder: ", files, folder)
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log("Date:::::::>0,", data)
    if (data.success) {
      fetchImagesFromFolder(folder)
      setFiles([])
      setSelectedImage("")
      setSelectedFile([])
      window.alert("Uploaded Successfully!")
    } else {
      console.error('Upload failed:', data.error);
    }
  };

  const fetchImagesFromFolder = async (folder) => {
    try {
      const response = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setImageUrls(data.results);
      } else {
        console.error('Fetch failed:', data.error);
      }
    } catch (error) {
      console.log("Err: ", error)
    }

  };


  useEffect(() => {
    console.log("Change in room: ", selectedRoom, selectedRoomId, roomName);

    if (selectedRoom && selectedRoomId) {
      setCurrentRoomImage('')
      setRoomName(selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, ''))
      let room_name = selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, '');

      console.log("roomname: ", room_name)

      setFolder(room_name)

      fetchImagesFromFolder(room_name)

      async function roomPhoto() {
        const response = await fetch(
          `/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${room_name}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let resultt = await response.json();
        console.log("Response:::::>", resultt);


        setCurrentRoomImage(resultt.imgNames)


      }

      //roomPhoto()

    }

  }, [selectedRoom, selectedRoomId])

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleImageSelect = (url) => {
    setSelectedImageUrls((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };



  const handleDelete = async () => {
    try {
      const publicIds = selectedImageUrls.map(url => {
        // Extract the public ID from the image URL
        const urlParts = url.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        return publicId;
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds: publicIds, action: "delete", folder: folder }),
      });

      const result = await response.json();
      if (result.success) {
        // Remove deleted images from the state
        setImageUrls((prev) =>
          prev.filter((url) => !selectedImageUrls.includes(url))
        );
        setSelectedImageUrls([]);
        window.alert("Images deleted successfully!");
      } else {
        console.error('Delete failed:', result.error);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
    }
  };


  return (

    <><div className="flex text-start" style={{
      position: "relative",
      left: "34px",
      top: "24px",
    }}>

      <Autocomplete
        size='sm'
        variant='bordered'
        defaultSelectedKey={selectedRoomId}
        className="w-full"
          inputProps={{
            classNames: {
              inputWrapper: "w-[400px]",
            },
          }}
        labelPlacement='outside-left'
        value={selectedRoom}
        allowsCustomValue={true}
        onInputChange={(value) => value === "Property Main" ? setSelectedRoom(value) : setSelectedRoom(value.split("-")[1])}
        onSelectionChange={(key) => setSelectedRoomId(key)}
      >
        {roomResult?.map((Room) => (
          Room.room_name === "Property Main"
            ? <AutocompleteItem key={Room.id} value={Room.room_name}>
              {Room.room_name}
            </AutocompleteItem>
            : <AutocompleteItem key={Room.id} value={Room.room_name}>
              {Room.room_no + "-" + Room.room_name}
            </AutocompleteItem>
        ))}
      </Autocomplete>


    </div>

      <div
        className=""
        style={{
          position: "relative",
          top: "50px",
          left: "34px",
          width: "177px",
          height: "200px",
        }}
      >
        <div>
          {/* Triggering the input click using a div */}
          <div
            onClick={() => document.getElementById('fileInput').click()}
            className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer"
            style={{
              width: "200%",
              height: "200px",
            }}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" />
            ) : (
              <span>Select Image</span>
            )}
          </div>

          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files;
                const file1 = target.files[0];

                if (file && file1) {
                  console.log("Initial FXN:::::>", file, file1);

                  setSelectedImage(URL.createObjectURL(file1 && file1));

                  setSelectedFile(file);

                  setFiles(Array.from(file));
                } else {
                  alert("No files selected");
                }
              }
            }}
            multiple
          />
        </div>

        <div
          style={{
            position: "relative",
            top: "23px",
          }}
        >
          <p>{selectedFile ? `${selectedFile.length} files selected` : ""}</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{ opacity: uploading ? ".5" : "1" }}
            className="bg-red-600 p-3 w-32 text-center rounded text-white"
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </div>
      </div>



      {/* <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: '100px', height: 'auto', margin: '10px' }} />
        ))}
      </div> */}

      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "0 0 46px 0",
        background: "whitesmoke",
        position: "relative",
        top: "24%",
      }}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>




      <div className="" style={{
        display: "grid",
        gridGap: "8px",
        gridTemplateColumns: "auto auto auto auto",
        position: "relative",
        top: "155px",
        left: "35px",
        width: "95%",
      }}>


        {imageUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Uploaded ${index}`}
              className={`w-full h-auto object-cover ${selectedImageUrls.includes(url) ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageSelect(url)}
            />
            {selectedImageUrls.includes(url) && (
              <button
                onClick={() => handleImageSelect(url)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>





      {/* <div>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))} />
        <input
          type="text"
          placeholder="Folder Name"
          value={folder}
          onChange={(e) => setFolder(e.target.value)} />
        <button onClick={handleUpload}>Upload</button>
      </div> */}


    </>
  );
}



function capitalize_each_word(val) {
  if (val === undefined || val === null) {
    return "";
  }

  const words = val.toString().split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  var str = words.join("");
  var replacedStr = "";

  for (var i = 0; i < str.length; i++) {
    if (str[i] === ",") {
      replacedStr += "";
    } else {
      replacedStr += str[i];
    }
  }

  return replacedStr;
}



