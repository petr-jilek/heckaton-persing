import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from "react-router-dom";

export default function InventuraPage() {
    const [items, setItems] = useState([])

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        var data = await axios.get("firma1/inventura/?detail=full&limit=0&offset=10");
        setItems(data.winstrom.inventura)
    }

    return (
        <>
            <p>InventuraPage</p>
            <></>
            <Button type="primary" onClick={get}>Get</Button>
            {items.map(x => (
                <div className='InvenuturaPage_items' key={x.id}>
                    <Link to={`/inventura/${x.id}`}>{x.typInventury}</Link>
                </div>
            ))}
        </>
    );
}
