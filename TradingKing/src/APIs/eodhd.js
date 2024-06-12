export const fetchData = async(duration , symbol , setData , mainData)=>{ //duration can be week, month or year
    var from;
    var to;
    var period;
    const date= new Date();
    if(duration === 'Y'){
        to=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        from=`${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()}`
        period="w";
    } else if (duration === 'M'){
        to=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        const monthFrom = date.getMonth()==0?12:date.getMonth();
        from=`${date.getFullYear()}-${monthFrom}-${date.getDate()}`
        period="d";
    } else if(duration === 'W'){
        to=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        var dayFrom = date.getDate() - 7;
        from = `${date.getFullYear()}-${date.getMonth()+1}-${dayFrom}` //For general case
        if(date.getDate() <=6){ //For cases such as 5/4/2024 or 3/3/2023 etc
            dayFrom = (date.getMonth() == 1?28:30) - (7 - date.getDate() - 1);
            from = `${date.getFullYear()}-${date.getMonth()}-${dayFrom}`
            if(date.getMonth() == 0){ //For cases such as 1/1/2024 or 2/1/2024
                from = `${date.getFullYear()-1}-12-${dayFrom}`
            }
        }
    } else if(duration === 'D'){
        if(date.getDay() == 6){ //Saturday
            to=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            from=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`
        } else if(date.getDay() == 0){ //Sunday
            to=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            from=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-2}`
        } else{ //Any other day
            to=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            from=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`
        }
        period="d";
    }
    try{
        //const response = await fetch(`https://eodhd.com/api/eod/${symbol}.US?from=${from}&to=${to}&period=${period}&api_token=demo&fmt=json`);
        const response = await fetch(`https://eodhd.com/api/eod/${symbol}.US?from=${from}&to=${to}&period=${period}&api_token=${process.env.REACT_APP_EODHD_API_KEY}&fmt=json`);
        if(!response.ok){
            throw new Error();
        }
        const data =await response.json(); 
        console.log(data);
        if(duration === 'Y'){
            setData({...mainData , year:  formatData(data)})
        } else if(duration === 'M'){
            setData({...mainData , month:  formatData(data)})
        } else if(duration === 'W'){
            setData({...mainData , week: formatData(data)});
        } 
        return data;
    }catch(err){
        console.log(err);
    }     
}

const formatData = (data)=>{
    return data.map(
        (elem , index) =>{
            const manipulatedDate = `${elem.date.substring(5,7)}/${elem.date.substring(8)}/${elem.date.substring(0,4)}`
            return {x :manipulatedDate , y :elem.close};
        }
    )
}