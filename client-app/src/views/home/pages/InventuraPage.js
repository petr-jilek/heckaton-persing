import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from "react-router-dom";

export default function InventuraPage() {
    const [items, setItems] = useState([])

    const get = async () => {
        var data = await axios.get("firma1/inventura/?detail=full&limit=0&offset=10", { headers: { accept: 'application/json', "Authorization": `Basic YWRtaW4xOmFkbWluMWFkbWluMQ==` } });
        var values = data.winstrom.inventura
        console.log(values)
        setItems(values)

        console.log(items)
    }

    const tryGet = async () => {
        var data = await axios.get("/WeatherForecast/try");
        console.log(data);
    }

    return (
        <>
            <p>InventuraPage</p>
            <></>
            <Button type="primary" onClick={get}>Get</Button>
            {items.map(x => (
                <div className='InvenuturaPage_items'>
                    <Link to={`/inventura/${x.id}`}>{x.typInventury}</Link>
                </div>
            ))}
        </>
    );
}
