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
                        {fetchallblog.slice(0, 1).map((post) => (
                            <div key={post._id}>
                                <div className="w-full h-full rounded-xl border border-gray-200 overflow-hidden lg:flex">
                                    <div className="flex justify-center lg:w-1/2 w-full h-56 lg:h-72">
                                        <Image
                                            src={post.image.url}
                                            alt={post.title}
                                            width={800}
                                            height={500}
                                            objectFit="cover"
                                        // className="aspect-[16/9]"
                                        />
                                    </div>

                                    <div className="lg:w-1/2">
                                        <div className="px-4 py-6">
                                            <div className="flex justify-start items-center gap-3 mt-3">
                                                <p className="text-base font-normal text-gray-500">
                                                    {new Date(post.date).toLocaleDateString()} - {post.readTime}
                                                </p>
                                            </div>
                                            <h2 className="mt-6 text-2xl font-medium text-gray-500">
                                                {post.title}
                                            </h2>
                                            <p className="mt-3 text-black/80 line-clamp-3">{post.intro}</p>
                                            <Link href={`/blog/${post._id}`} passHref>
                                                <div className="mt-6 inline-block px-4 py-2 border-gray-200 border rounded text-gray-500 font-semibold tracking-wide hover:bg-[#ed1c24] hover:text-white">
                                                    Read more
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-7xl mx-auto w-[95%] py-10">
                    <h1 className="text-4xl font-semibold text-center text-gray-600">
                        Recent blog posts
                    </h1>
                    <div className="my-10 grid gap-6 lg:grid-cols-3 lg:w-full mx-auto">
                        {fetchallblog.slice(1).map((post) => (
                            <div key={post._id}>
                                <div className="rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="w-full h-56 lg:h-64 relative">
                                        <Image
                                            src={post.image.url}
                                            alt={post.title}
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
                                                {new Date(post.date).toLocaleDateString()} - {post.readTime}
                                            </p>
                                        </div>
                                        <h2 className="mt-6 text-2xl font-medium text-gray-500">
                                            {post.title}
                                        </h2>
                                        <p className="mt-3 text-black/80 font-extralight line-clamp-3">{post.intro}</p>
                                        <Link href={`/blog/${post._id}`} passHref>
                                            <div className="mt-6 inline-block px-4 py-2 border-gray-200 border rounded text-gray-500 font-semibold tracking-wide hover:bg-[#ed1c24] hover:text-white">
                                                Read more
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>

    );
};

export default BlogCard;
