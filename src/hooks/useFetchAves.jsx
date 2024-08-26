import { useCallback, useEffect, useState } from "react";

const useFetchAves = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);

    const fetchAvesData = useCallback(async () => {
        //console.log("useCallback");
        setLoading(true);
        setData([]);
        setError("");
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al consumir la API");
            const data = await res.json();
            setData(data);
        } catch (error) {
            //console.log(error.message);
            setError(error.message);
            setData([]);
        } finally {
            //console.log("finally");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        //console.log("useEffect");
        fetchAvesData();
    }, []);

    return { loading, error, data, setData };
};

export default useFetchAves;
