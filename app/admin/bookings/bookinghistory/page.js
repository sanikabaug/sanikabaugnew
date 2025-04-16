'use client';
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import NewDataTable from "@/_components/Admin/Bookings/NewDataTable";

const BookingHistoryPage = () => {
  const { isOpen, onOpenChange } = useDisclosure();

  const [users, setUsers] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initialFxn = async () => {
    try {
      const response = await fetch(`/api/userApi/booking_details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setUsers(result.data_All);
    } catch (error) {
      console.error("Error::::::>", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    initialFxn();
  }, []);

  return (
    <>
      {!isClient ? (
        <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" className="h-[90%] overflow-y-scroll">
            <ModalContent>
              {(onClose) => (
                <div className="flex justify-center items-center">
                  <ModalHeader className="flex flex-col gap-1">Booking Details</ModalHeader>
                  <ModalBody>
                    {/* Add modal content here */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={() => console.log('Submit')}>
                      Submit
                    </Button>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </div>
              )}
            </ModalContent>
          </Modal>
          <div className="lg:ml-2 lg:mr-2">
            <NewDataTable users={users} />
          </div>
        </>
      )}
    </>
  );
};

export default BookingHistoryPage;
