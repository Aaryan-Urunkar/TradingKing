import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
const StockChart = (props)=>{

    const [toBeSet , setToBeSet] = useState(null);

    const color = toBeSet?((toBeSet[0].y - toBeSet[toBeSet.length-1].y) < 0 ? "#26C281":"#ED3419" ):"";
    
    useEffect(()=>{
        if(props.timeframe === 'Y'){
            setToBeSet(props.chartData.year)
        } else if(props.timeframe === 'M'){
            setToBeSet(props.chartData.month)
        } else if(props.timeframe === 'W'){
            setToBeSet(props.chartData.week)
        }
    },[props.chartData , props.timeframe])

    var options = {
        colors:[color],
        title : {
            text:props.symbol , 
            align:"center",
            style:{
                fontSize:"24px",
                fontWeight:"bold",
            }
        },
        chart:{
            type:'area',
            id:"stock data",
            animations:{
                enabled:'true',
                animateGradually:{
                    enabled:'true',
                    delay:125,
                }
            }
        }, xaxis: {
            type: "datetime"
          }
    }

    const series = [{
        data : toBeSet
    }]

    return (
        // <h3>stockchart</h3>
        <div className='mt-5 p-4 bg-white shadow-sm'>
           {toBeSet && <Chart options={options} type='area' series={series} width="100%"></Chart>}
        </div>
    )
}
export default StockChart;