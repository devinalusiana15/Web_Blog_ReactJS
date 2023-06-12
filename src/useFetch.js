import {useState,useEffect} from 'react';

const useFetch = (url)=>{
    const [data, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setIsError] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();
        
        setTimeout(()=>{
            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    if(!res.ok){
                        throw Error('Could not fetch the data for that resource')
                    }
                    return res.json();
                })
                .then(data=>{
                    setBlogs(data);
                    setIsPending(false);
                    setIsError(null);
                })
                .catch((err)=>{
                    if(err.name === 'AbortError'){
                        console.log('fecth aborted');
                    }else{
                        setIsPending(false);
                        setIsError(err.message);
                    }
                })
        },1000);

        return () => abortCont.abort();
    },[url]);

    return {data, isPending, error};
}

export default useFetch;