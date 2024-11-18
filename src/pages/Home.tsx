import "swiper/swiper-bundle.css";

import { Loader2Icon, Triangle } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import lorems from "@/assets/posts.json";

interface Data {
    Title: string;
    Subtitle: string;
    ImageUrl: string;
}

const makeBulletPoints = (lorem: string) => {
    const words = lorem.split(" ");
    const numberOfWords = words.length;
    const wordsPerLine = Math.floor(numberOfWords / 4);
    const lines = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
};

export default function Home() {
    const [data, setData] = useState<Data[] | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details");
            const result = await response.json();
            setData(result.Details);
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
                        <div className="swiper-button-next hidden aspect-square rounded bg-white/30 sm:flex">
                            <Triangle className="h-3 rotate-90 fill-current text-white" />
                        </div>

                        <div className="swiper-button-prev hidden aspect-square rounded bg-white/30 sm:flex">
                            <Triangle className="h-3 -rotate-90 fill-current text-white" />
                        </div>

                        {data.slice(0, 2).map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative mb-6 h-[445px] w-full overflow-hidden">
                                    <img src={item.ImageUrl} className={`h-full w-full object-cover object-[${index === 0 ? "50%_25%" : "0%_0%"}]`} />

                                    <div className="absolute inset-0 flex w-full flex-col items-start justify-center bg-gradient-to-r from-black/80 to-transparent to-100% p-6 sm:to-50%">
                                        <div className="w-full sm:mx-auto sm:w-4/5 md:w-3/5">
                                            <div className="w-full space-y-4 sm:w-96">
                                                <h2 className="text-4xl text-white">{item.Title}</h2>
                                                <p className="text-md text-white">{item.Subtitle}</p>

                                                <Link
                                                    to="/contact-us"
                                                    className="mt-4 inline-block w-full rounded-md bg-sky-600 px-6 py-3 text-center text-xs font-extrabold text-white sm:w-auto"
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

                    <div className="mx-auto flex w-full flex-col-reverse justify-between gap-4 px-7 pt-7 xl:w-3/5 xl:flex-row xl:gap-20 xl:px-0">
                        <div className="mb-6">
                            <h2 className="text-xl font-light">{data[1].Title}</h2>
                            <p className="my-6 text-xs leading-5 text-gray-700 lg:w-11/12">
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

                            <Link to="/about-us" className="mt-4 inline-block rounded-md bg-sky-600 px-6 py-3 text-xs font-extrabold text-white">
                                Learn more
                            </Link>
                        </div>

                        <img
                            src="https://bluespaceltd.co.uk/wp-content/uploads/2024/04/BLU_OfficeDesign_CompanyCulture-scaled-e1713265104126.jpg"
                            className="my-auto h-80 rounded-md object-cover"
                        />
                    </div>

                    <div className="relative mb-6 mt-10 w-full overflow-hidden sm:h-[445px]">
                        <img src={data[2].ImageUrl} className="min-h-[450px] w-auto object-cover object-center sm:w-full sm:object-[50%_10%]" />
                        <div className="absolute inset-0 mx-auto my-auto flex w-full flex-col items-start justify-center rounded-sm p-4 sm:w-4/5 sm:py-8 xl:w-3/5 xl:py-12">
                            <div className="flex h-full w-full flex-col justify-between bg-black/50 p-8 sm:w-2/3 xl:w-1/2">
                                <h2 className="text-xl text-white">{data[2].Title}</h2>
                                <p className="text-xs leading-5 text-white">
                                    {lorems
                                        .slice(0, 3)
                                        .map((lorem) => lorem.body)
                                        .join(" ")}
                                </p>

                                <div className="w-full cursor-not-allowed rounded-md bg-blue-50 px-6 py-3 text-center text-xs font-bold text-sky-700 sm:w-28">
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto my-8 w-11/12 space-y-6 pb-6 text-center sm:w-4/5 md:w-3/5">
                        <div className="space-y-2">
                            <h1 className="text-xl font-light">{lorems[0].title}</h1>
                            <h2 className="">{lorems[1].title}</h2>
                        </div>

                        <div className="gap-8 text-left text-xs leading-5 text-gray-700 md:columns-3">
                            <p className="font-semibold">{lorems[0].body + lorems[1].body}</p>
                            <br />
                            {lorems.slice(0, 10).map((lorem, i) => (
                                <span key={i}>
                                    {lorem.body}
                                    {(i + 1) % 5 === 0 && i !== 9 ? (
                                        <>
                                            .<br />
                                            <br />
                                        </>
                                    ) : (
                                        ". "
                                    )}
                                </span>
                            ))}
                        </div>

                        <Link to="/contact-us" className="mt-4 inline-block rounded-md bg-sky-600 px-6 py-3 text-xs font-extrabold text-white">
                            Contact Us
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex h-screen items-center justify-center">
                    <Loader2Icon height={60} width={60} className="animate-spin text-sky-600" />
                </div>
            )}
        </div>
    );
}
