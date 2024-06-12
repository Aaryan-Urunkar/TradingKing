import { useEffect, useState } from "react";
import { finnhubClient } from "../APIs/finnhub";


const StockData = (props)=>{

    const [data, setData] = useState({})

    useEffect(()=>{
        const fetchData = async() =>{
            finnhubClient.companyProfile2({'symbol': props.symbol}, (error, data, response) => {
                console.log(response);
                setData(response.body);
            });
        }
        fetchData();
    },[])

    return (
        <div>
            {data && (
                    <div>
                        <div className="row border bg-white shadow rounded p-4 mt-5">
                            <div className="col">
                                <div>
                                    <span className="fw-bold" style={{display:"inline-block"}}>name:</span>
                                    {data.name}
                                </div>
                                <div>
                                    <span className="fw-bold">country:</span>
                                    {data.country}

                                </div>
                                <div>
                                    <span className="fw-bold">ticker:</span>
                                    {data.ticker}

                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <span className="fw-bold">exchange:</span>
                                    {data.exchange}

                                </div>
                                <div>
                                    <span className="fw-bold">industry:</span>
                                    {data.finnhubIndustry}

                                </div>
                                <div>
                                    <span className="fw-bold">ipo:</span>
                                    {data.ipo}

                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <span className="fw-bold">market-cap:</span>
                                    {data.marketCapitalization}

                                </div>
                                <div>
                                    <span className="fw-bold">shares-outstanding:</span>
                                    {data.shareOutstanding}
                                </div>
                                <div>
                                    <span className="fw-bold">url:</span>
                                    <a href={data.weburl}>{data.name} </a>
                                </div>
                            </div>
                        </div>
                        <img style={{width:"250px",height:"250px" , margin:"auto" , marginTop:"50px"}} src={data.logo} alt="" />
                    </div>
                   
                )}
        
        </div>

    );
    
}

export default StockData