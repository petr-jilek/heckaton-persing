import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link, useParams } from "react-router-dom";


export default function InventuraDetailPage() {
    let { id } = useParams();

    const [item, setItem] = useState({})

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        var data = await axios.get(`firma1/inventura/${id}`);
        setItem(data.winstrom.inventura[0])
    }

    return (
        <>
            <p>InventuraDetailPage</p>
            <h3>Id</h3>
            <p>{item.id}</p>
            <h3>Typ Inventury</h3>
            <p>{item.typInventury}</p>
            <h3>Datum Zahajeni</h3>
            <p>{item.datZahaj}</p>
            <h3>stavK</h3>
            <p>{item.stavK}</p>
            <h3>sklad</h3>
            <p>{item.sklad}</p>
        </>
    );
}
