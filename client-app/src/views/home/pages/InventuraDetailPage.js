import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


export default function InventuraDetailPage() {
    let { id } = useParams();

    const [item, setItem] = useState({})

    const [ean, setEan] = useState({})

    const [eanItems, setEanItems] = useState([])

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        var data = await axios.get(`firma1/inventura/${id}`);
        setItem(data.winstrom.inventura[0])
    }

    const sendEan = async () => {
        console.log(ean)

        var data = await axios.get(`https://inventura.flexibee.eu/v2/c/firma1/skladova-karta/%28sklad%20%3D%20%22code%3ASKLAD%22%20and%20ucetObdobi%20%3D%20%22code%3A2022%22%20and%20cenik%3D%22ean%3A${ean}%22%29?detail=summary&limit=10&offset=0`)

        var eItems = data.winstrom["skladova-karta"]

        if (eItems.length > 0) {
            if (eanItems.filter(x => x.cenik === eItems[0].cenik).length > 0) {
                toast.error("Item already in list")
            }
            else {
                eItems[0]["mycount"] = 1
                setEanItems([...eanItems, eItems[0]])
                toast.success("Item added")
            }
        }
        else {
            toast.error("No item for this EAN")
        }
    }

    const editCount = (val, cenik) => {
        if (val < 0) {
            return
        }

        const newList = eanItems.map((item) => {
            if (item.cenik === cenik) {
                const updatedItem = {
                    ...item,
                    mycount: val,
                };

                return updatedItem;
            }

            return item;
        });

        setEanItems(newList);
    }


    const saveEanItems = async () => {
        console.log(eanItems)
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

            <hr />

            <Form.Group className="mb-3">
                <Form.Label>EAN</Form.Label>
                <Form.Control onChange={(e) => { setEan(e.target.value) }} />
            </Form.Group>

            <Button onClick={sendEan}>Add</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nazev</th>
                        <th>Pocet</th>
                    </tr>
                </thead>
                <tbody>
                    {eanItems.map(x =>
                        <tr>
                            <td>{x.cenik.split(":")[1]}</td>
                            <td><input onChange={(e) => { editCount(e.target.value, x.cenik) }} value={x.mycount} type="number" /></td>
                        </tr >)}
                </tbody>
            </Table>

            <br />
            <Button onClick={saveEanItems}>Ulozit</Button>
        </>
    );
}
