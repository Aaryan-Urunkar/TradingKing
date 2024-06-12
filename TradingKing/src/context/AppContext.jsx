import { createContext , useEffect, useState } from "react";

export const GlobalContext = createContext();



const AppContext = (props)=>{

    const [watchList , setWatchList] = useState(localStorage.getItem("watchList")?.split(",") || ["MSFT" , "GOOGL" , "AMZN"]);
//localStorage.getItem(watchList).split(",")
    
    useEffect(()=>{
        localStorage.setItem("watchList" , watchList);
    },[watchList])

    const addStock = (stock)=>{
        if(!watchList.includes(stock)){
            setWatchList([...watchList , stock])
        }
    }

    const deleteStock = (stock)=>{
        setWatchList(watchList.filter((el) =>{
            return el !== stock
        }));
    }

    return (
        <GlobalContext.Provider value={{watchList , addStock , deleteStock}}> {props.children} </GlobalContext.Provider>
    )

}

export default AppContext;