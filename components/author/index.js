import React from "react";
import Image from "next/image";

const Author = ({author}) => {
    return (
        <div className="text-center mb-8 mt-20 relative rounded-lg
        bg-black bg-opacity-20 p-12">
            <div className="absolute left-0 right-0 -top-8 ">
                <Image
                    unoptimized
                    alt={author.name}
                    width={100}
                    height={100}
                    className="align-middle rounded-full object-cover"
                    src={author.photo.url}
                />

            </div>
            <h3 className="text-white my-6 text-xl font-bold">{author.name}</h3>
            <p className="text-white text-lg">
                {author.bio}
            </p>
        </div>
    )
}
export default Author;