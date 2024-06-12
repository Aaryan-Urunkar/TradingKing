import { useEffect, useState, useContext } from "react";
import {finnhubClient} from "../APIs/finnhub";
import { BsFillCaretDownFill ,BsFillCaretUpFill } from "react-icons/bs";
import {GlobalContext} from "../context/AppContext";
import { useNavigate} from "react-router-dom"


const StockList =()=>{

    const {watchList} = useContext(GlobalContext)
    // console.log(value);

    const [stock, setStock] = useState([]);

    const navigate = useNavigate();
    

    const changeColor = (change)=>{
        return change>0?"success":"danger";
    }

    const renderIcon = (change)=>{
        return change>0? <BsFillCaretUpFill/>:<BsFillCaretDownFill/>
    }

    const handleStockSelect = (symbol)=>{
        navigate(`detail/${symbol}`)
    }

    useEffect(()=>{

        var r=[]
        const fetchData = async() =>{
            const responses = await Promise.all(watchList.map((stockName) => {
                finnhubClient.quote(stockName, (error, data, response) => {
                    //r.push(data);
                    //r= {...r , [stockName]:data}
                    r.push({symbol:stockName , data,});
                    // console.log(r);
                });
            }));
        }
        fetchData();

        setTimeout(()=> setStock(r), 2000);

    },[watchList]);

    return(
        <div>
            <table style={{marginTop:"25rem"}}  className="table hover ">
                <thead style={{
                    color:"rgb(79,89,102)"
                }}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">PClose</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stock.map((data) =>{
                            return (
                                <tr style={{cursor:"pointer"}} onClick={()=> handleStockSelect(data.symbol)} className="table-row" key={data.symbol}>
                                    <th scope="row">{data.symbol}</th>
                                    <td>{data.data.c}</td>
                                    <td className={`text-${changeColor(data.data.d)}`} >{data.data.d} {renderIcon(data.data.d)}</td>
                                    <td className={`text-${changeColor(data.data.d)}`}>{data.data.dp} {renderIcon(data.data.d)}</td>
                                    <td>{data.data.h}</td>
                                    <td>{data.data.l}</td>
                                    <td>{data.data.o}</td>
                                    <td>{data.data.pc}</td>
                                    {/* <td>{data.data.c}</td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StockList