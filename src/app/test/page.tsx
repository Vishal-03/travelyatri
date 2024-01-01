"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
const Test = () => {


    const fetchdata = async () => {
        const res = await axios.get("/api/test");
        console.log(res.data);

        return res.data;

    }
    const { isLoading, error, data } = useQuery({ queryKey: ['test'], queryFn: fetchdata })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    return (
        <>
            <div>This is just a test function</div>
            {data.message}
        </>
    );
}

export default Test;