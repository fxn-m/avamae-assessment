import posts from "@/assets/posts.json";

export default function AboutUs() {
    return (
        <div className="mx-auto my-10 w-full space-y-6 px-4 text-xs leading-5 text-gray-600 sm:w-3/5">
            <h1 className="mt-4 text-xl">About Us</h1>

            <div className="space-y-6">
                <p>
                    <span className="font-bold">{posts[1].body}. </span>
                    {posts
                        .slice(0, 3)
                        .map((post) => post.body)
                        .join(" ")}
                    <span>. </span>
                    <a href="https://fxn-m.com/#/" className="text-sky-500 underline">
                        Praesent varius porta blandit
                    </a>{" "}
                    mollis, felis ut convallis convallis.
                </p>

                <p>
                    {posts
                        .slice(3, 6)
                        .map((post) => post.body)
                        .join(" ")}
                    .
                </p>

                <img
                    src="https://bluespaceltd.co.uk/wp-content/uploads/2024/04/BLU_OfficeDesign_CompanyCulture-scaled-e1713265104126.jpg"
                    className="mx-auto mb-4 h-96 rounded-md object-cover"
                />

                <p>
                    {posts
                        .slice(6, 12)
                        .map((post) => post.body)
                        .join(" ")}
                    .
                </p>
            </div>

            <div className="space-y-4 text-xs">
                <h2 className="text-base">{posts[12].title}:</h2>

                <ul className="list-inside list-disc font-semibold">
                    {posts.slice(13, 17).map((post, i) => (
                        <li key={i}>{post.title}</li>
                    ))}
                </ul>

                <p>
                    {posts
                        .slice(12, 14)
                        .map((post) => post.body)
                        .join(" ")}
                    .
                </p>

                <p>
                    {posts
                        .slice(14, 20)
                        .map((post) => post.body)
                        .join(" ")}
                    .
                </p>
            </div>
        </div>
    );
}
