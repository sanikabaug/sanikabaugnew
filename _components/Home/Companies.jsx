'use client'
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { MoveLeft, MoveRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import Image from "next/image";

const CorporateGuestsSection = () => {
  return (
    <div className="w-full h-full">
      <section className="bg-gray-100 py-16 w-full flex flex-col justify-center items-center h-auto relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-1 justify-start items-start px-4 lg:px-8 w-[95%] h-auto">
          <div className="w-full lg:w-[30%] flex flex-col gap-2 justify-start items-start h-auto">
            <p className="uppercase tracking-widest">
              Testimonials
            </p>
            <div className="font-serif text-5xl flex flex-col gap-2">
              <p>What</p>
              <p>They&apos;re Say</p>
              <p>About Us</p>
            </div>
            <div className="relative mt-16 inline-flex gap-2">
              <button
                className="swiper-button-prev-custom  z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
              >
                <MoveLeft className="m-2" />
              </button>
              <button
                className="swiper-button-next-custom  right-96 z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
              >
                <MoveRight className="m-2" />
              </button>

            </div>
          </div>
          <div className="w-full lg:w-[70%] h-auto">
            <div className="h-auto">
              <Swiper
                spaceBetween={30}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                modules={[ Autoplay, Navigation ]}
                className="mySwiper2"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1.5,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide className="flex flex-col">
                  
                  <div className="h-[100vh] lg:h-[85vh] bg-gray-100">
                    <div className="bg-white p-6 shadow-md text-center max-w-full mx-auto relative px-16">
                      <div className="flex justify-center items-center mb-4 pt-8">
                        <div className="bg-orange-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#040404" d="m21.95 8.721l-.025-.168l-.026.006A4.5 4.5 0 1 0 17.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222l-.474.197l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a7 7 0 0 0-.063-.539m-11 0l-.025-.168l-.026.006A4.5 4.5 0 1 0 6.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.473.195l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a8 8 0 0 0-.064-.537"></path></svg>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-8">
                        “Clean rooms, well maintained, inside a gated community. Staff are also helpful and take care of all your requirements. Hot water available in bathrooms. Close proximity to city so all food items available close by to go and buy and some even deliver to the farmhouse”
                      </p>
                      <h3 className="text-2xl font-serif text-gray-900">Hitesh Salian</h3>
                      <p className="text-gray-500 mb-16">Self</p>

                      {/* Avatar */}
                      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <Image
                          src={"https://img.freepik.com/free-photo/stylish-indian-beard-model-man-casual-clothes-posed-outdoor-street-india_627829-12953.jpg?semt=ais_hybrid&w=740"}
                          alt="Swapnil Dhavale"
                          width={800}
                          height={800}
                          className="object-fill"
                        />
                      </div>

                    </div>
                  </div>




                </SwiperSlide>

                <SwiperSlide className="flex flex-col">
                  <div className="h-[100vh] lg:h-[85vh] bg-gray-100">
                    <div className="bg-white p-6 shadow-md text-center max-w-full mx-auto relative px-16">
                      <div className="flex justify-center items-center mb-4 pt-8">
                        <div className="bg-orange-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#040404" d="m21.95 8.721l-.025-.168l-.026.006A4.5 4.5 0 1 0 17.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222l-.474.197l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a7 7 0 0 0-.063-.539m-11 0l-.025-.168l-.026.006A4.5 4.5 0 1 0 6.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.473.195l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a8 8 0 0 0-.064-.537"></path></svg>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-8">
                        “Farmhouse is best in all aspect… loved to stay here ❤️”
                      </p>
                      <h3 className="text-2xl font-serif text-gray-900">Swapnil Dhavale</h3>
                      <p className="text-gray-500 mb-16">Self</p>

                      {/* Avatar */}
                      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <Image
                          src={"https://img.freepik.com/free-photo/indian-man-portrait-temple_53876-14535.jpg?ga=GA1.1.1981722286.1738842281&semt=ais_hybrid&w=740"}
                          alt="Swapnil Dhavale"
                          width={800}
                          height={800}
                          className="object-fill"
                        />
                      </div>

                    </div>
                  </div>




                </SwiperSlide>


                <SwiperSlide className="flex flex-col">
                  <div className="h-[100vh] lg:h-[85vh] bg-gray-100">
                    <div className="bg-white p-6 shadow-md text-center max-w-full mx-auto relative px-16">
                      <div className="flex justify-center items-center mb-4 pt-8">
                        <div className="bg-orange-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#040404" d="m21.95 8.721l-.025-.168l-.026.006A4.5 4.5 0 1 0 17.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222l-.474.197l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a7 7 0 0 0-.063-.539m-11 0l-.025-.168l-.026.006A4.5 4.5 0 1 0 6.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.473.195l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a8 8 0 0 0-.064-.537"></path></svg>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-8">
                        “Our stay at Sanika Baug Farmhouse was nothing short of amazing! The peaceful environment, surrounded by nature and greenery, 
made it the perfect escape from the city. The rooms were neat, spacious, and gave off a cozy, homely vibe. 
Would definitely recommend it and can&apos;t wait to come back again!”
                      </p>
                      <h3 className="text-2xl font-serif text-gray-900">Neha Patkar</h3>
                      <p className="text-gray-500 mb-16">Self</p>

                      {/* Avatar */}
                      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <Image
                          src={"https://img.freepik.com/free-photo/successful-confident-businesswoman-manages-financial-planning_482257-107979.jpg?semt=ais_hybrid&w=740"}
                          alt="Swapnil Dhavale"
                          width={800}
                          height={800}
                          className="object-fill"
                        />
                      </div>

                    </div>
                  </div>




                </SwiperSlide>

                <SwiperSlide className="flex flex-col">
                  
                  <div className="h-[100vh] lg:h-[85vh] bg-gray-100">
                    <div className="bg-white p-6 shadow-md text-center max-w-full mx-auto relative px-16">
                      <div className="flex justify-center items-center mb-4 pt-8">
                        <div className="bg-orange-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#040404" d="m21.95 8.721l-.025-.168l-.026.006A4.5 4.5 0 1 0 17.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222l-.474.197l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a7 7 0 0 0-.063-.539m-11 0l-.025-.168l-.026.006A4.5 4.5 0 1 0 6.5 14c.223 0 .437-.034.65-.065c-.069.232-.14.468-.254.68c-.114.308-.292.575-.469.844c-.148.291-.409.488-.601.737c-.201.242-.475.403-.692.604c-.213.21-.492.315-.714.463c-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.473.195l.484 1.939l.597-.144c.191-.048.424-.104.689-.171c.271-.05.56-.187.882-.312c.317-.143.686-.238 1.028-.467c.344-.218.741-.4 1.091-.692c.339-.301.748-.562 1.05-.944c.33-.358.656-.734.909-1.162c.293-.408.492-.856.702-1.299c.19-.443.343-.896.468-1.336c.237-.882.343-1.72.384-2.437c.034-.718.014-1.315-.028-1.747a8 8 0 0 0-.064-.537"></path></svg>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-8">
                        “Sanika Baug Farmhouse is a hidden gem! The moment we arrived, we were welcomed with genuine hospitality and warmth. 
                        The nature-filled atmosphere, chirping birds, and open space made our stay calm and peaceful.”
                      </p>
                      <h3 className="text-2xl font-serif text-gray-900">Rahul Yadav</h3>
                      <p className="text-gray-500 mb-16">Self</p>

                      {/* Avatar */}
                      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <Image
                          src={"https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740"}
                          alt="Swapnil Dhavale"
                          width={800}
                          height={800}
                          className="object-fill"
                        />
                      </div>

                    </div>
                  </div>




                </SwiperSlide>


              </Swiper>
            </div>

          </div>
        </div>



{/* Dotted background behind form */}
<div className="absolute right-[65%] bottom-[15%] z-10 hidden md:block rounded-full">
        <div className="w-40 h-40 bg-[radial-gradient(circle,#c47a5a_2px,transparent_2px)] bg-[length:12px_12px] opacity-20 rounded-full"></div>
      </div>
      </section>

      <section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        <div className="bg-black w-full h-full bg-opacity-50 p-8 rounded-md flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Looking for a Relaxing Vacation <br /> at Farmhouse?
          </h1>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded transition duration-300" onClick={(e) => window.location.href='/contactus'}>
            BOOK YOUR STAY
          </button>
        </div>
      </section>
    </div>

  );
};

export default CorporateGuestsSection;
