import React from "react"
import AutoComplete from "../components/AutoComplete"
import StockList from "../components/StockList"

const StockOverview =()=>{
    return(
        <React.Fragment>
            <AutoComplete />
            <StockList/>
        </React.Fragment>
    )
}

export default StockOverview