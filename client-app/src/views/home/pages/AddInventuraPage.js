import { Button, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AddInventuraPage() {
    const [items, setItems] = useState([])

    const [name, setName] = useState("")
    const [storage, setStorage] = useState(4)

    const navigate = useNavigate();

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        var data = await axios.get("firma1/sklad?detail=full&limit=10&offset=0");
        setItems(data.winstrom.sklad)
    }

    const create = async () => {
        var data = {
            winstrom: {
                inventura: [
                    {
                        typInventury: name,
                        sklad: storage,
                        popisInventury: "Popis",
                        datZahaj: "2022-04-20",
                        stavK: "stavInventury.zahajena"
                    }
                ]
            }
        }

        await axios.post("firma1/inventura/", data);

        toast.success("Inventura přidána");

        navigate('/inventura');
    };

    return (
        <div className='HomeViewPage_container_div'>
            <h1>Přidat inventuru</h1>
            <Form.Group className="mb-3">
                <Form.Label>Název inventury</Form.Label>
                <Form.Control onChange={(e) => { setName(e.target.value) }} />
            </Form.Group>


            <Form.Label htmlFor="inputfirm_name">Název skladu</Form.Label>

            <div>
                <select id="lang" onChange={(e) => { setStorage(e.target.value) }}>
                    {items.map(x => <option key={x.id} value={x.id}>{x.nazev}</option>)}
                </select>
            </div>
            <br />

            <Button onClick={create}>Vytvořit</Button>
        </div>
    );
}
