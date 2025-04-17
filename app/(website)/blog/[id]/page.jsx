"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Check, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const BlogPost = ({ params: rawParams }) => {

    const [params, setParams] = useState(null);
    const [post, setPost] = useState(null);
    const router = useRouter();

    // Unwrap `params`
    useEffect(() => {

        async function fetchParams() {
            const resolvedParams = await rawParams; // Unwrap the params promise
            setParams(resolvedParams);
            console.log("rawparams", resolvedParams.id)
            if (resolvedParams.id === "1") {
                setPost({
                    id: "1",
                    title: "Experience Authentic Village Life at Sanika Baug Farm Stay",
                    writer: "Sanika Baug Team",
                    date: "2024-04-10",
                    readTime: "4 min read",
                    image: {
                        url: "https://www.sciencing.com/sciencing/benefits-agriculture-farmers-6973506/f38449d949b744a8ae5cb79029f8165d.jpg",
                    },
                    sections: [
                        {
                            sectionheading: "Reconnect with Nature",
                            sectioncontent: [
                                {
                                    sectioncontentone: "Escape the chaos of urban life and immerse yourself in the peaceful, rustic charm of Sanika Baug. Here, every sunrise brings a melody of chirping birds, and each evening winds down with a symphony of crickets under starlit skies."
                                },
                                {
                                    sectioncontentone: "Wander through fruit orchards, rest beneath banyan trees, and explore the simplicity of nature that thrives untouched around you."
                                }
                            ]
                        },
                        {
                            sectionheading: "Daily Life on the Farm",
                            sectioncontent: [
                                {
                                    sectioncontentone: "Experience the joy of hands-on farming. Start your day by milking cows, feeding goats, and watering crops with friendly farmers guiding you."
                                },
                                {
                                    sectioncontentone: "Take a bullock cart ride through the winding village paths and wave to locals living life at a peaceful pace. Try your hand at grinding grains or making rotis on traditional chulhas."
                                }
                            ],
                            quote: "At Sanika Baug, we don’t just offer a stay — we offer a way of life."
                        },
                        {
                            sectionheading: "Activities You Can Enjoy",
                            list: [
                                { listone: "Organic farming and harvesting fresh vegetables" },
                                { listone: "Bullock cart rides through scenic village trails" },
                                { listone: "Traditional cooking workshops with local women" },
                                { listone: "Evening bonfire with folk music and storytelling" },
                                { listone: "Birdwatching and exploring nearby nature trails" }
                            ]
                        },
                        {
                            sectionheading: "Farm Fresh Delights",
                            sectioncontent: [
                                {
                                    sectioncontentone: "Enjoy delicious home-cooked meals made from farm-fresh ingredients. The food at Sanika Baug is pure, flavorful, and deeply rooted in Maharashtrian tradition."
                                }
                            ],
                            tableheader: "Meal Type",
                            tabledescription: "Specialties Served",
                            tableheaderone: [
                                { tableheading: "Breakfast" },
                                { tableheading: "Lunch" },
                                { tableheading: "Dinner" }
                            ],
                            tabledescriptionone: [
                                { tabledescriptionpara: "Poha, upma, farm-fresh milk, and jaggery" },
                                { tabledescriptionpara: "Bajra roti, pithla, bhakri, rice, dal, and seasonal sabzi" },
                                { tabledescriptionpara: "Khichdi, thecha, green chutney, salad, and curd" }
                            ]
                        },
                        {
                            sectionheading: "Why Choose Sanika Baug?",
                            sectioncontent: [
                                {
                                    sectioncontentone: "Unlike commercial resorts, Sanika Baug offers an authentic village life experience with warm hospitality, real activities, and a deep connection to nature and tradition."
                                }
                            ],
                            list: [
                                { listone: "Safe and family-friendly atmosphere" },
                                { listone: "Educational for children and adults" },
                                { listone: "Ideal weekend getaway from Pune/Mumbai" }
                            ]
                        }
                    ]
                })
            } else if (resolvedParams.id === "2") {
                setPost({
                    id: "2",
                    title: "A Nature Lover’s Paradise – Discover the Biodiversity at Sanika Baug",
                    writer: "Sanika Baug Team",
                    date: "2024-04-18",
                    readTime: "4 min read",
                    image: {
                        url: "https://cdn.magicdecor.in/com/2023/02/29223532/image-1683787166-9890.jpg",
                    },
                    sections: [
                        {
                            sectionheading: "A Living Canvas of Green",
                            sectioncontent: [
                                {
                                    sectioncontentone:
                                        "Sanika Baug is more than just a scenic getaway—it's a thriving ecosystem where flora and fauna coexist in harmony. From lush groves to vibrant meadows, every corner of the farm is teeming with life."
                                },
                                {
                                    sectioncontentone:
                                        "The natural landscape is a treat for the eyes and a balm for the soul. With chirping birds, rustling leaves, and colorful butterflies fluttering by, nature truly speaks here."
                                }
                            ]
                        },
                        {
                            sectionheading: "Birdwatcher’s Delight",
                            sectioncontent: [
                                {
                                    sectioncontentone:
                                        "Wake up to the melodic calls of the Indian paradise flycatcher or spot a flock of vibrant parakeets perched on mango trees. Sanika Baug is home to over 70 bird species, making it a haven for ornithologists and casual watchers alike."
                                },
                                {
                                    sectioncontentone:
                                        "Don’t forget your binoculars—sunrise and dusk offer the best views, especially near the water bodies where many birds gather to bathe or feed."
                                }
                            ],
                            quote: "If you listen closely at Sanika Baug, nature sings in a thousand voices."
                        },
                        {
                            sectionheading: "Explore Native Flora & Fauna",
                            list: [
                                { listone: "Medicinal herbs like tulsi, neem, and ashwagandha growing wild" },
                                { listone: "Seasonal flowering plants attracting bees and butterflies" },
                                { listone: "Mongoose, squirrels, frogs, and rare insects spotted regularly" },
                                { listone: "Peaceful coexistence of wildlife with village and farming life" }
                            ]
                        },
                        {
                            sectionheading: "Eco-Conscious Farming & Sustainability",
                            sectioncontent: [
                                {
                                    sectioncontentone:
                                        "The farm practices natural and organic farming methods that protect the soil, conserve water, and nourish biodiversity. Composting, mulching, and crop rotation are part of daily life at Sanika Baug."
                                },
                                {
                                    sectioncontentone:
                                        "Visitors are welcome to learn and take part in these sustainable farming practices, understanding how biodiversity and agriculture can go hand in hand."
                                }
                            ],
                            tableheader: "Sustainable Practice",
                            tabledescription: "Impact on Biodiversity",
                            tableheaderone: [
                                { tableheading: "Organic Fertilizers" },
                                { tableheading: "Water Harvesting" },
                                { tableheading: "Crop Rotation" }
                            ],
                            tabledescriptionone: [
                                { tabledescriptionpara: "Supports microbial life and improves soil health" },
                                { tabledescriptionpara: "Maintains water tables and supports wetland species" },
                                { tabledescriptionpara: "Prevents pests naturally and encourages species variety" }
                            ]
                        },
                        {
                            sectionheading: "Why Nature Lovers Adore Sanika Baug",
                            sectioncontent: [
                                {
                                    sectioncontentone:
                                        "Every visit to Sanika Baug feels like stepping into a living nature documentary. Whether you're a photographer, writer, or a peace seeker, the diverse natural life will leave you inspired and rejuvenated."
                                }
                            ],
                            list: [
                                { listone: "Uninterrupted time with nature – no traffic, no noise" },
                                { listone: "Friendly guides to explain local species and habitats" },
                                { listone: "Eco-stay that supports conservation efforts" }
                            ]
                        }
                    ]
                })
            } else if (resolvedParams.id === "3") {
                setPost({
                    id:"3",
                    title: "Top 5 Reasons to Choose Sanika Baug for Your Next Family Getaway",
                    writer: "Sanika Baug Team",
                    date: "2024-04-24",
                    readTime: "4 min read",
                    image: {
                      url: "https://thumbs.dreamstime.com/b/little-house-woods-small-green-30853281.jpg",
                    },
                    sections: [
                      {
                        sectionheading: "A Safe, Kid-Friendly Environment",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "Sanika Baug is designed with families in mind. Open spaces, secure surroundings, and friendly staff make it a perfect retreat for parents and kids alike."
                          },
                          {
                            sectioncontentone:
                              "Children can safely explore nature, feed animals, and participate in fun farm activities while parents enjoy peace of mind."
                          }
                        ]
                      },
                      {
                        sectionheading: "Engaging Farm Activities for All Ages",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "From milking cows to harvesting veggies, Sanika Baug offers hands-on experiences that teach valuable lessons in sustainability and teamwork."
                          },
                          {
                            sectioncontentone:
                              "It’s not just about learning — it’s about bonding. Families love spending quality time together while trying new things."
                          }
                        ],
                        quote: "At Sanika Baug, fun and learning go hand in hand for every member of the family."
                      },
                      {
                        sectionheading: "Comfortable, Homely Accommodations",
                        list: [
                          { listone: "Spacious rooms designed for families" },
                          { listone: "Clean and cozy interiors with rural charm" },
                          { listone: "Private sit-outs to enjoy your morning chai" },
                          { listone: "All basic amenities to ensure a worry-free stay" }
                        ]
                      },
                      {
                        sectionheading: "Wholesome Meals Everyone Will Love",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "Meals at Sanika Baug are cooked with love, using fresh ingredients straight from the farm. From piping hot bhakris to traditional sweets, there’s something for every palate."
                          },
                          {
                            sectioncontentone:
                              "Kids love the simplicity, and parents appreciate the healthiness of every bite."
                          }
                        ],
                        tableheader: "Meal Time",
                        tabledescription: "Family Favorites",
                        tableheaderone: [
                          { tableheading: "Breakfast" },
                          { tableheading: "Lunch" },
                          { tableheading: "Dinner" }
                        ],
                        tabledescriptionone: [
                          { tabledescriptionpara: "Upma, poha, milk, jaggery, seasonal fruits" },
                          { tabledescriptionpara: "Pithla-bhakri, rice, dal, sabzi, papad" },
                          { tabledescriptionpara: "Khichdi, salad, curd, and a sweet treat" }
                        ]
                      },
                      {
                        sectionheading: "Reconnect Without Screens",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "Leave the digital world behind and reconnect the old-fashioned way — through laughter, conversations, and shared adventures."
                          },
                          {
                            sectioncontentone:
                              "With no distractions, families find deeper connections in the simplicity of rural life."
                          }
                        ],
                        list: [
                          { listone: "No TV, no phones — just real togetherness" },
                          { listone: "Board games, nature walks, and stargazing nights" },
                          { listone: "A unique getaway that becomes a lasting memory" }
                        ]
                      }
                    ]
                  })
            } else if (resolvedParams.id === "4") {
                setPost({
                    title: "Weekend Getaways Near Karjat – Why Sanika Baug Tops the List",
                    writer: "Sanika Baug Team",
                    date: "2024-04-30",
                    readTime: "4 min read",
                    image: {
                      url: "https://cdn.pixabay.com/photo/2017/06/11/02/05/wheat-2391348_1280.jpg",
                    },
                    sections: [
                      {
                        sectionheading: "A Refreshing Escape Just a Drive Away",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "Located within easy driving distance from Karjat, Sanika Baug offers the perfect weekend escape from city life. Surrounded by lush greenery, the journey itself is as rejuvenating as the stay."
                          },
                          {
                            sectioncontentone:
                              "Whether you're planning a spontaneous trip or a well-deserved break, Sanika Baug is your close-to-home nature retreat."
                          }
                        ]
                      },
                      {
                        sectionheading: "Unique Rural Experience",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "Unlike typical resorts, Sanika Baug brings you closer to authentic village life. Feed farm animals, help with daily farming tasks, and interact with locals who warmly welcome you."
                          },
                          {
                            sectioncontentone:
                              "It’s more than just a stay — it’s a window into a simpler, more grounded way of living."
                          }
                        ],
                        quote: "Sanika Baug isn’t just near Karjat — it’s a world away from stress and screens."
                      },
                      {
                        sectionheading: "Things to Do During Your Weekend Stay",
                        list: [
                          { listone: "Morning walks through fruit orchards" },
                          { listone: "Try your hand at pottery or cooking on a chulha" },
                          { listone: "Relax in a hammock with a view of the fields" },
                          { listone: "Evening bonfires with folk stories and music" },
                          { listone: "Stargazing and night photography opportunities" }
                        ]
                      },
                      {
                        sectionheading: "Traditional Food That Warms the Soul",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "Every meal at Sanika Baug is a celebration of fresh ingredients and regional recipes. From crunchy bhakris to seasonal vegetables, your weekend will be filled with flavor."
                          },
                          {
                            sectioncontentone:
                              "And yes, don’t forget to try the farm’s sweet jaggery and fresh milk!"
                          }
                        ],
                        tableheader: "Meal Time",
                        tabledescription: "What’s Served",
                        tableheaderone: [
                          { tableheading: "Breakfast" },
                          { tableheading: "Lunch" },
                          { tableheading: "Dinner" }
                        ],
                        tabledescriptionone: [
                          { tabledescriptionpara: "Poha, upma, tea, fresh milk, and fruits" },
                          { tabledescriptionpara: "Chapati, bhaji, dal-rice, papad, and pickle" },
                          { tabledescriptionpara: "Masala khichdi, chutney, salad, and curd" }
                        ]
                      },
                      {
                        sectionheading: "Why It Tops the List of Weekend Getaways",
                        sectioncontent: [
                          {
                            sectioncontentone:
                              "What sets Sanika Baug apart is its balance of relaxation, authenticity, and adventure. Whether you’re a nature lover, foodie, or just tired of the city, this is your spot."
                          }
                        ],
                        list: [
                          { listone: "Quick access from Karjat and Mumbai" },
                          { listone: "Peaceful surroundings and clean air" },
                          { listone: "Unique, meaningful rural experiences" },
                          { listone: "Ideal for families, couples, or solo travelers" },
                          { listone: "Affordable and all-inclusive packages" }
                        ]
                      }
                    ]
                  })
            }
        }
        fetchParams();
    }, [rawParams]);

    // useEffect(() => {
    //     if (!params) return; // Wait for params to resolve
    //     async function getData() {
    //         try {
    //             const response = await axios.post("/api/blog/blogfetch", {
    //                 operation: "fetchsinglejob",
    //                 _id: params.id,
    //             });
    //             // setPost(response.data.fetchsingleblog);
    //         } catch (error) {
    //             console.error("Error fetching the blog post:", error);
    //         }
    //     }
    //     getData();
    // }, [params]);

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
                    <span>{post?.writer}</span> | <span> {new Date(post?.date).toLocaleDateString()}</span> |{" "}
                    <span>{post?.readTime}</span>
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
                {post?.title}
            </h1>
            <div className="flex justify-center mb-4 w-full h-56 md:h-[22rem] lg:h-96">
                <Image
                    src={post?.image.url}
                    alt={post?.title}
                    width={500}
                    height={500}
                    objectFit="cover"
                    className="aspect-[16/9]"
                />
            </div>
            <p className="mb-4 font-normal text-black/80 text-center">{post?.title}</p>
            {post?.sections.map((section, index) => (
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

        // <div>asdfasdf</div>
    );
};

export default BlogPost;
