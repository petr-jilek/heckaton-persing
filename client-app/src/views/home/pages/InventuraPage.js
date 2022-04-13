import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap'
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
            <h1>Inventury</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Název</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(x =>
                        <tr>
                            <td><Link to={`/inventura/${x.id}`}>{x.typInventury}</Link></td>
                        </tr >
                    )}
                </tbody>
            </Table>
        </>
    );
}
