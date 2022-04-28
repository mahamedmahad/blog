import React, {useEffect, useState} from "react";

import moment from "moment";
import Link from 'next/link'

import {getRecentPosts, getSimilarPosts} from "../../services";

const PostWidget = ({categories, slug}) => {
    const [relatedPost, setRelatedPost] = useState([])


    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug).then((result) => setRelatedPost(result))
        } else {
            getRecentPosts().then((result) => setRelatedPost(result))
        }


    }, [slug])

    console.log(relatedPost)

    return (<div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPost.map((post) => (<div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            className="align-middle rounded-full w-14 h-14 object-cover"
                        />
                    </div>

                    <div className="flex-grow ml-2 ">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('DD-MM-YYYY')}
                        </p>
                        <Link
                            href={`/post/${post.slug}`}
                            className="text-md"

                        >
                            <span className="cursor-pointer hover:text-pink-700 transition duration-700
                             ">
                               {post.title}
                            </span>
                        </Link>
                    </div>
                </div>))}
        </div>)
}
export default PostWidget;