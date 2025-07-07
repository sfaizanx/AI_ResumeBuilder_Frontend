import { useEffect, useState } from "react"

export const UseLocalStorage = (key, initialValue) => {
    const [value,setValue] = useState(()=>{
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue ? JSON.parse(localStorageValue) : initialValue;
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value]);
    return [value,setValue];
}