import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../APIs/eodhd";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

const StockDetails =()=>{

    const [timeframe , setTimeFrame] = useState('W')
    const [chartData , setChartData] = useState({});
    const {symbol} = useParams();

    const buttonRef1 = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();

    const changeHandler = (e) =>{
        if(e.target.name === "week"){
            setTimeFrame('W');
            buttonRef1.current.className = "btn btn-primary";
            buttonRef2.current.className = "btn btn-outline-primary";
            buttonRef3.current.className = "btn btn-outline-primary";
        } else if(e.target.name === "month"){
            setTimeFrame('M');
            buttonRef2.current.className = "btn btn-primary";
            buttonRef1.current.className = "btn btn-outline-primary";
            buttonRef3.current.className = "btn btn-outline-primary";
        } else if(e.target.name === "year"){
            setTimeFrame('Y');
            buttonRef3.current.className = "btn btn-primary";
            buttonRef2.current.className = "btn btn-outline-primary";
            buttonRef1.current.className = "btn btn-outline-primary";
        }


    }

    useEffect(()=>{
        if((timeframe === 'W' && !chartData.week) || (timeframe === 'M' && !chartData.month) || (timeframe === 'Y' && !chartData.year)){
            // fetchData(timeframe , "MCD" , setChartData , chartData);
            fetchData(timeframe , symbol , setChartData , chartData);
        }
        
    },[timeframe])
    return(
        <>
            <div>
                {chartData && <StockChart chartData={chartData} symbol={symbol} timeframe={timeframe}></StockChart>}
            </div>
            <button ref={buttonRef1}  onClick={changeHandler} name="week">7d</button>
            <button ref={buttonRef2}  onClick={changeHandler} name="month">1m</button>
            <button ref={buttonRef3}  onClick={changeHandler} name="year">1y</button>
            <StockData symbol={symbol}/>
        </>
    )
}

export default StockDetails