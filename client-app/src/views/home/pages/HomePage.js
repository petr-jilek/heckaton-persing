import { Button, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function HomePage() {
    const [items, setItems] = useState([])

    const [name, setName] = useState("")
    const [storage, setStorage] = useState(4)

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        var data = await axios.get("firma1/sklad?detail=full&limit=10&offset=0");
        setItems(data.winstrom.sklad)
    }

    const create = () => {

        console.log(name)
        console.log(storage)
    };

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Nazev</Form.Label>
                <Form.Control onChange={(e) => { setName(e.target.value); console.log(e.target.value) }} />
            </Form.Group>


            <Form.Label htmlFor="inputfirm_name">Storage</Form.Label>

            <div>
                <select id="lang" onChange={(e) => { setStorage(e.target.value) }}>
                    {items.map(x => <option key={x.id} value={x.id}>{x.nazev}</option>)}
                </select>
            </div>

            <Button onClick={create}>Add</Button>
        </>
    );
}
