import "swiper/swiper-bundle.css";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Triangle } from "lucide-react";

interface Data {
    Title: string;
    Subtitle: string;
    ImageUrl: string;
}

const makeBulletPoints = (lorem: string) => {
    // Split the string into an array of words
    const words = lorem.split(" ");
    const numberOfWords = words.length;
    const wordsPerLine = Math.floor(numberOfWords / 4);
    const lines = [];
    // Loop through the words and add them to the lines
    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
};

export default function Home() {
    const [data, setData] = useState<Data[] | null>(null);
    const [lorems, setLorems] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details");
            const result = await response.json();
            setData(result.Details);
        })();

        (async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const result = await response.json();
            console.log(result);
            setLorems(result);
        })();
    }, []);

    return (
        <div>
            {data ? (
                <>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }}
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                    >
                        <div className="swiper-button-next aspect-square rounded bg-white/30">
                            <Triangle className="h-3 rotate-90 fill-current text-white" />
                        </div>
                        <div className="swiper-button-prev aspect-square rounded bg-white/30">
                            <Triangle className="h-3 -rotate-90 fill-current text-white" />
                        </div>
                        {data.slice(0, 2).map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative mb-6 h-[410px] w-full overflow-hidden">
                                    <img src={item.ImageUrl} className="h-full w-full object-cover object-[50%_25%]" />

                                    <div className="absolute inset-0 flex w-full flex-col items-start justify-center bg-gradient-to-r from-black/80 to-transparent to-50% p-6">
                                        <div className="mx-auto w-3/5">
                                            <div className="w-96 space-y-4">
                                                <h2 className="text-4xl font-bold text-white">{item.Title}</h2>
                                                <p className="text-md text-white">{item.Subtitle}</p>
                                                <Link
                                                    to="/contact-us"
                                                    className="mt-4 inline-block rounded-md bg-blue-400 px-6 py-3 text-xs font-extrabold text-white"
                                                >
                                                    Contact Us
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mx-auto flex w-3/5 justify-between gap-20 pt-7">
                        <div className="mb-6 w-5/12">
                            <h2 className="text-xl">{data[1].Title}</h2>
                            <p className="my-6 text-xs leading-5 text-gray-700">
                                {lorems
                                    .slice(0, 2)
                                    .map((lorem) => lorem.body)
                                    .join(" ")}
                            </p>
                            <ul className="list-inside list-disc text-xs font-semibold leading-7 text-gray-700">
                                {makeBulletPoints(lorems[0].body).map((line: string, index: number) => (
                                    <li key={index}>{line}</li>
                                ))}
                            </ul>
                        </div>
                        <img src={data[1].ImageUrl} className="mb-4 h-80 rounded-md object-cover" />
                    </div>

                    <div className="pt-10">
                        <div className="mb-6">
                            <img src={data[2].ImageUrl} className="mb-4 h-64 w-full object-cover" />
                            <h2 className="text-xl font-bold">{data[2].Title}</h2>
                            <p className="text-gray-700">{data[2].Subtitle}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
