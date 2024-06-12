import { useEffect, useRef, useState, useContext } from "react";
import { finnhubClient } from "../APIs/finnhub";
import { GlobalContext } from "../context/AppContext";

const AutoComplete =()=>{

    const [search, setSearch] = useState("");
    const [response , setResponse] = useState([]);

    const {addStock} = useContext(GlobalContext)

    const renderDropdown = ()=>{
        const show = search?"show" : "";
        return (
            <ul  style={{height:"400px", overflowY:"scroll" , overflowX:"hidden" , cursor:"pointer"}} className={`dropdown-menu ${show}`}>
                { response.map((stock) =>{
                        return <li onClick={()=> {addStock(stock.symbol); setSearch("")}} className=" dropdown-item " key={stock.symbol}>{stock.description} (<b>{stock.symbol}</b>)</li>
                    })}
            </ul>
        )
    }

    useEffect(()=>{
        const fetchData = async()=>{
            finnhubClient.symbolSearch(search, (error, data, response) => {
                console.log(data);
                setResponse(data.result);
              });
        }
        if(search.length > 0){
            fetchData();
        } else {
            setResponse([]);
        }
    } ,[search])

    return(
        <div className="w-50 mx-auto p-5 rounded ">
            <div className="form-floating dropdown">
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="text" id="search" style={{backgroundColor:"rgb(145,158,171,0.4)", width:'20%'}} placeholder="Search symbol" className="form-control"/>
                {/* <label htmlFor="search">Search</label> */}
                { renderDropdown()}
            </div>
        </div>
    )
}

export default AutoComplete