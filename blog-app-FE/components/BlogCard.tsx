import { Heart } from "lucide-react";
import Image from "next/image";

import { cookies } from "next/headers";
import Link from "next/link";

async function BlogCard() {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:5000/blogs", {
    headers: {
      Cookie: cookieStore.toString()
    }
    // cache: "no-store"
  });

  // console.log(res, "res");

  if (res.status !== 200) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p>Unable to fetch</p>
      </div>
    );
  }

  const result = await res.json();
  // console.log(result, "resilt")
  const data = result.message;
  // console.log(data, "data")
  return (
    <div className="pt-[10vh]">
      {data.length === 0 ? (
        <div className="h-[90vh] w-full flex items-center justify-center">
          <p>{result?.info}</p>
        </div>
      ) : (
        Array.isArray(data) &&
        data.map((obj) => {
          return (
            <Link href={`/blogs/${obj._id}`} key={obj._id}>
              <div className="grid gap-6 py-6 border-b border-gray-200 md:flex">
                <div className="h-50 md:h-20 md:w-28  rounded-md overflow-hidden  flex-shrink-0 md:order-2">
                  <Image
                    src={obj.banner || `./blog-banner`}
                    alt="blog-banner"
                    className="w-full h-full object-cover"
                    width={500}
                    height={100}
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    {obj.author} ·{" "}
                    {new Date(obj.date).toLocaleDateString("en-GB")}
                  </p>

                  <h2 className="text-xl font-semibold leading-snug mb-2 line-clamp-2">
                    {obj.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {obj.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Heart size={16} />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default BlogCard;
