import { useEffect, useState } from "react";
import { getData } from "../firebase/firebase";


import PriceChart  from "./PriceChart";

export function Price(){
    const [price, updatePrice] = useState([]);

    const [graphData, setData] = useState([]);


    useEffect(() => {
        const unsubscribe = getData('price', (queryResult) => {
            let d = []
            let values = queryResult.docs.map((data) => {
                let {timestamp,value} = data.data()
                d = [...d, [timestamp.seconds*1000, parseFloat(value.replace(',',''))]]
                return data.data().value
            })
            setData(d);
            updatePrice(values);
        }, (error) => console.log("error getting data"))
        return unsubscribe;
    }, [])

    return (
        <div className="container-chart">
            <p className="price">Bitcoin price: $ {price[0]}</p>
            <PriceChart data={graphData}/>
        </div>
    )
}
