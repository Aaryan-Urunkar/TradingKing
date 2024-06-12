import { useEffect } from "react";
import { useParams } from "react-router-dom"
const StockDetails =()=>{

    const {symbol} = useParams();

    useEffect(()=>{
        
    },[])
    return(
        <div>StockDetailsPage</div>
    )
}

export default StockDetails