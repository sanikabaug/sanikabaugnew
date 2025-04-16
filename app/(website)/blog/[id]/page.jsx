"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Check, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const BlogPost = ({ params: rawParams }) => {
    const [params, setParams] = useState(null); // For unwrapping params
    const [post, setPost] = useState(null);
    const router = useRouter();

    // Unwrap `params`
    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await rawParams; // Unwrap the params promise
            setParams(resolvedParams);
        }
        fetchParams();
    }, [rawParams]);

    useEffect(() => {
        if (!params) return; // Wait for params to resolve
        async function getData() {
            try {
                const response = await axios.post("/api/blog/blogfetch", {
                    operation: "fetchsinglejob",
                    _id: params.id,
                });
                setPost(response.data.fetchsingleblog);
            } catch (error) {
                console.error("Error fetching the blog post:", error);
            }
        }
        getData();
    }, [params]);

    const handleBack = () => {
        router.back();
    };

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <div className="container mx-auto border my-10 w-[95%] lg:w-full py-8 px-4 lg:p-8">
            <div className="text-gray-600 mb-2 flex justify-between">
                <div>
                    <span>{post.writer}</span> | <span> {new Date(post.date).toLocaleDateString()}</span> |{" "}
                    <span>{post.readTime}</span>
                </div>
                <Button
                    onClick={handleBack}
                    variant="bordered"
                    color="default"
                    radius="full"
                    startContent={<Undo2 />}
                    className=" border-gray-200  shadow-2xl border text-gray-500 font-normal tracking-wide hover:bg-[#ed1c24] hover:text-white"
                >
                    Back
                </Button>
            </div>
            <h1 className="text-gray-600 text-3xl lg:text-4xl mb-4 text-center font-bold">
                {post.title}
            </h1>
            <div className="flex justify-center mb-4 w-full h-56 md:h-[22rem] lg:h-96">
                <Image
                    src={post.image.url}
                    alt={post.title}
                    width={500}
                    height={500}
                    objectFit="cover"
                    className="aspect-[16/9]"
                />
            </div>
            <p className="mb-4 font-normal text-black/80 text-center">{post.title}</p>
            {post.sections.map((section, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl text-black mb-2 font-semibold">
                        {section.sectionheading}
                    </h2>
                    {section.sectioncontent && section.sectioncontent.map((content, contentIndex) => (
                        <p key={contentIndex} className="font-normal text-black/80 mb-4 text-lg">
                            {content.sectioncontentone}
                        </p>
                    ))}
                    {section.quote && (
                        <blockquote className="border-l-4 border-[#ed1c24] pl-4 italic text-gray-700 mb-4 text-2xl my-5 py-2">
                            {section.quote}
                        </blockquote>
                    )}
                    {section.list && (
                        <div className="list-disc list-inside mb-4">
                            {section.list.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="font-normal text-black/80 text-lg flex"
                                >
                                    {item.listone && <Check className="text-gray-300" />}
                                    <span className={item.listone ? "ml-2 w-[91%]" : ""}>{item.listone}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {section.tableheader && (
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-lg">
                                            {section.tableheader}
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-lg">
                                            {section.tabledescription}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {section.tableheaderone.map((header, headerIndex) => (
                                        <tr key={headerIndex}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {header.tableheading}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {section.tabledescriptionone[headerIndex]?.tabledescriptionpara}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
            <Button
                onClick={handleBack}
                variant="bordered"
                color="default"
                radius="full"
                startContent={<Undo2 />}
                className=" border-gray-200  shadow-2xl border text-gray-500 font-normal tracking-wide hover:bg-[#ed1c24] hover:text-white"
            >
                Back
            </Button>
        </div>
    );
};

export default BlogPost;
