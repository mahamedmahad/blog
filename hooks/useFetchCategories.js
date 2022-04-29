import React, {useEffect, useState} from "react";


import {getCategories} from "../services";

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories))
    }, [])


    return { categories};
}
export default useFetchCategories;