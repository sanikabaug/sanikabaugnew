"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

const BlogCard = () => {

    const [fetchallblog, setfetchallleblog] = useState([]);
    console.log(fetchallblog, "fetchallblog");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.post("/api/blog/blogfetch", {
                    operation: "fetchallblog",
                });
                console.log(response.data.fetchsingleblog, "fetch single blog");
                setfetchallleblog(response.data.fetchsingleblog)
            } catch (error) {

            } finally {
                setIsLoading(false)
            }
        }
        getdata()
    }, [])

    return (
        isLoading
            ? <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color="danger"/>
            </div>
            : <>
                <section className="max-w-7xl w-[95%] mx-auto pt-10">
                    <h1 className="text-4xl font-semibold text-center text-gray-600">
                        Latest blog posts
                    </h1>
                    <div className="my-10 grid gap-6 lg:grid-cols-1 lg:w-[95%] mx-auto">
                        
                            <div>
                                <div className="w-full h-full rounded-xl border border-gray-200 overflow-hidden lg:flex">
                                    <div className="flex justify-center lg:w-1/2 w-full h-56 lg:h-72">
                                        <Image
                                            src="https://www.sciencing.com/sciencing/benefits-agriculture-farmers-6973506/f38449d949b744a8ae5cb79029f8165d.jpg"
                                            alt={"Experience Authentic Village Life at Sanika Baug Farm Stay"}
                                            width={800}
                                            height={500}
                                            objectFit="cover"
                                        />
                                    </div>

                                    <div className="lg:w-1/2">
                                        <div className="px-4 py-6">
                                            <div className="flex justify-start items-center gap-3 mt-3">
                                                <p className="text-base font-normal text-gray-500">
                                                  23/10/2024 - {"8 min read"}
                                                </p>
                                            </div>
                                            <h2 className="mt-6 text-2xl font-medium text-gray-500">
                                                {"Experience Authentic Village Life at Sanika Baug Farm Stay"}
                                            </h2>
                                            <p className="mt-3 text-black/80 line-clamp-3">{"Escape the hustle of city life and immerse yourself in the tranquility of rural Maharashtra. At Sanika Baug Farm Stay, experience traditional village life with organic-farming, bullock cart rides, and fresh homemade meals."}</p>
                                            <Link href={`/blog/${"1"}`} passHref>
                                                <div className="mt-6 inline-block px-4 py-2 border-gray-200 border rounded text-gray-500 font-semibold tracking-wide hover:bg-[#ed1c24] hover:text-white">
                                                    Read more
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </section>

                <section className="max-w-7xl mx-auto w-[95%] py-10">
                    <h1 className="text-4xl font-semibold text-center text-gray-600">
                        Recent blog posts
                    </h1>
                    <div className="my-10 grid gap-6 lg:grid-cols-3 lg:w-full mx-auto">
                        
                            <div>
                                <div className="rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="w-full h-56 lg:h-64 relative">
                                        <Image
                                            src="https://cdn.magicdecor.in/com/2023/02/29223532/image-1683787166-9890.jpg"
                                            alt={"A Nature Lover’s Paradise – Discover the Biodiversity at Sanika Baug"}
                                            quality={100}
                                            fill
                                            sizes="100vw"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        // className="aspect-[16/9]"
                                        />
                                    </div>


                                    <div className="px-4 py-6">
                                        <div className="flex justify-start items-center gap-3 mt-3">
                                            <p className="text-base font-normal text-gray-500">
                                                11/11/2024 - 9 min read time
                                            </p>
                                        </div>
                                        <h2 className="mt-6 text-2xl font-medium text-gray-500">
                                            {"A Nature Lover’s Paradise – Discover the Biodiversity at Sanika Baug"}
                                        </h2>
                                        <p className="mt-3 text-black/80 font-extralight line-clamp-3">{"From vibrant butterflies to chirping birds and lush-green plantations, Sanika Baug is a haven for nature enthusiasts."}</p>
                                        <Link href={`/blog/${"2"}`} passHref>
                                            <div className="mt-6 inline-block px-4 py-2 border-gray-200 border rounded text-gray-500 font-semibold tracking-wide hover:bg-[#ed1c24] hover:text-white">
                                                Read more
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>



                            <div>
                                <div className="rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="w-full h-56 lg:h-64 relative">
                                        <Image
                                            src="https://thumbs.dreamstime.com/b/little-house-woods-small-green-30853281.jpg"
                                            alt={"Top 5 Reasons to Choose Sanika Baug for Your Next Family Getaway"}
                                            quality={100}
                                            fill
                                            sizes="100vw"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        // className="aspect-[16/9]"
                                        />
                                    </div>


                                    <div className="px-4 py-6">
                                        <div className="flex justify-start items-center gap-3 mt-3">
                                            <p className="text-base font-normal text-gray-500">
                                                17/12/2024 - 10 min read time
                                            </p>
                                        </div>
                                        <h2 className="mt-6 text-2xl font-medium text-gray-500">
                                            {"Top 5 Reasons to Choose Sanika Baug for Your Next Family Getaway"}
                                        </h2>
                                        <p className="mt-3 text-black/80 font-extralight line-clamp-3">{"Looking for a unique weekend escape? Here’s why Sanika Baug Farm Stay is perfect for families."}</p>
                                        <Link href={`/blog/${"3"}`} passHref>
                                            <div className="mt-6 inline-block px-4 py-2 border-gray-200 border rounded text-gray-500 font-semibold tracking-wide hover:bg-[#ed1c24] hover:text-white">
                                                Read more
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>




                            <div>
                                <div className="rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="w-full h-56 lg:h-64 relative">
                                        <Image
                                            src="https://cdn.pixabay.com/photo/2017/06/11/02/05/wheat-2391348_1280.jpg"
                                            alt={"Weekend Getaways Near Karjat – Why Sanika Baug Tops the List"}
                                            quality={100}
                                            fill
                                            sizes="100vw"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        // className="aspect-[16/9]"
                                        />
                                    </div>


                                    <div className="px-4 py-6">
                                        <div className="flex justify-start items-center gap-3 mt-3">
                                            <p className="text-base font-normal text-gray-500">
                                                09/01/2025 - 12 min read time
                                            </p>
                                        </div>
                                        <h2 className="mt-6 text-2xl font-medium text-gray-500">
                                            {"Weekend Getaways Near Karjat – Why Sanika Baug Tops the List"}
                                        </h2>
                                        <p className="mt-3 text-black/80 font-extralight line-clamp-3">{"Planning a weekend trip near karjat? Discover why Sanika Baug is the best-kept secret for nature lovers and families."}</p>
                                        <Link href={`/blog/${"4"}`} passHref>
                                            <div className="mt-6 inline-block px-4 py-2 border-gray-200 border rounded text-gray-500 font-semibold tracking-wide hover:bg-[#ed1c24] hover:text-white">
                                                Read more
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        
                    </div>
                </section>
            </>

    );
};

export default BlogCard;
