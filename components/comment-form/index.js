import React, {useState, useEffect, useRef} from "react";

import {submitComment} from "../../services";

const CommentForm = ({slug}) => {
    const [error, setError] = useState(false);
    // const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    /* reference to the input fields. */
    const commentEl = useRef()
    const nameEl = useRef()
    const emailEl = useRef()
    const storeDataEl = useRef()


    /* Setting the value of the input fields to the values in localStorage. */
    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name')
        emailEl.current.value = window.localStorage.getItem('email')
    }, [])


    const handleCommentSubmission = key => {
        setError(false);

        const {value: comment} = commentEl.current;
        const {value: name} = nameEl.current;
        const {value: email} = emailEl.current;
        const {checked: storeData} = storeDataEl.current;

        if (!comment || !name || !email) {
            setError(true)
            return;
        }


        const commentObj = {name, email, comment, slug}

        if (storeData) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)

        } else {
            window.localStorage.removeItem('name', name)
            window.localStorage.removeItem('email', email)
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true)


            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 2000)

        })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Leave a Reply
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-4 ">
                <textarea
                    ref={commentEl}
                    className="p-4 outline-none w-full  rounded-lg
                    focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comment..."
                    name="comment"
                />


            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
                <input
                    type="text"
                    ref={nameEl}
                    className="py-2 px-4 outline-none w-full  rounded-lg
                    focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name..."
                    name="name"
                />

                <input
                    type="email"
                    ref={emailEl}
                    className="py-2 px-4 outline-none w-full  rounded-lg
                    focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email..."
                    name="email"
                />

            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 ">
                <div>
                    <input
                        ref={storeDataEl}
                        type="checkbox"
                        id="storeData"
                        name="store"
                        value="true"
                    />
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save Email and Name</label>

                </div>
            </div>

            {error && <p className="text-xs text-red-500">All fields are required</p>}

            <div className="mt-8 text-center">

                {showSuccessMessage ? (
                    <span className="text-lg  font-semibold mt-3 text-green-400 ">
                        Comment submitted for review
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={handleCommentSubmission}
                        className="transition duration-500 ease hover:bg-indigo-900 inline-block
                    bg-pink-600 px-8 py-3 rounded-full text-white text-lg"
                    >
                        Post Comment
                    </button>
                )
                }
            </div>

        </div>
    )
}
export default CommentForm;