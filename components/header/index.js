import React from "react";

import Link from "next/link";

const categories = [
    {
        name: "React", slug:'react'
    },
    { name: "Web Development", slug: "web-dev"}
]
const Header = () => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b-2 border-blue-400 w-full inline-block  py-8">
                <div className="md:float-left block">
                    {/* eslint-disable-next-line @next/next/link-passhref */}
                    <Link href="/">
                        <span className="cursor-pointer font-bold sm:text-4xl text-white text-2xl">Blog</span>
                    </Link>
                </div>

                <div className="hidden md:float-left md:contents">
                    {categories.map((cat) => (
                        <Link key={cat.slug} href={`/category/${cat.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4
                            font-semibold cursor-pointer ">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Header;