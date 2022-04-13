import { Button, Form, input } from 'react-bootstrap'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function HomePage() {
    const [items, setItems] = useState([])

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        var data = await axios.get("firma1/sklad?detail=full&limit=10&offset=0");
        setItems(data.winstrom.sklad)
    }

    return (
        <>

            {/*<p>HomePage</p>
            <Button variant="primary" onClick={get}>Get</Button>
           <Button variant="warning" onClick={tryGet}>Try</Button>*/}

            <Form.Group className="mb-3">
                <Form.Label>Enteer your username</Form.Label>
                <Form.Control placeholder="Input Name" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enteer your password</Form.Label>
                <Form.Control placeholder="Input Password" />
            </Form.Group>

            <Form.Label htmlFor="inputfirm_name">Enter name of storage</Form.Label>
            {/* <Form.Control
                type="storage_name"
                id="inputstorage_name"
            />*/}
            <div></div>
            <select id="storage_name" name="storage_name">
                {items.map(x => <option key={x.id} value={x.nazev}>{x.nazev}</option>)}
            </select>
            <div>
                <Button onclick="window.location.href='';">
                    Continue
                </Button>
            </div>
        </>
    );
}
