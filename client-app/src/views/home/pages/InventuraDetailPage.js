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

    const [addedEanItems, setAddedEanItems] = useState([])

    useEffect(() => {
        get()
    }, []);

    const get = async () => {
        var data = await axios.get(`firma1/inventura/${id}`);
        setItem(data.winstrom.inventura[0])

        var addedEans = await axios.get(`https://inventura.flexibee.eu/v2/c/firma1/inventura-polozka/%28inventura%3D${data.winstrom.inventura[0].id}%29?detail=custom%3Aid%2Csklad%2CdatZahaj%2CmnozMjReal%2Ccenik&limit=100&offset=0`)
        setAddedEanItems(addedEans.winstrom["inventura-polozka"])
    }

    const sendEan = async () => {
        var data = await axios.get(`https://inventura.flexibee.eu/v2/c/firma1/skladova-karta/%28sklad%20%3D%20%22${item.sklad}%22%20and%20ucetObdobi%20%3D%20%22code%3A2022%22%20and%20cenik%3D%22ean%3A${ean}%22%29?detail=full&limit=10&offset=0`)

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
        var data = {
            winstrom: {
                "inventura-polozka": []
            }
        }

        eanItems.forEach(x =>
            data.winstrom["inventura-polozka"].push({
                inventura: item.id,
                sklad: item.sklad,
                cenik: x.cenik,
                skladKarta: x.id,
                mnozMjReal: x.mycount
            })
        )

        await axios.post("firma1/inventura-polozka", data)

        await get()
    }

    const deleteHistoryItem = async (id) => {
        console.log(id)

        var data = {
            winstrom: {
                "inventura-polozka": []
            }
        }

        data.winstrom["inventura-polozka"].push({
            id: id,
            "@action": "delete",
        });

        await axios.post("firma1/inventura-polozka", data)

        toast.success("Item deleted")

        await get()
    }

    return (
        <>
            <h1>Detail Inventury</h1>
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

            <h2>Historie přidání</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nazev</th>
                        <th>Pocet</th>
                    </tr>
                </thead>
                <tbody>
                    {addedEanItems.map(x =>
                        <tr key={x.id}>
                            <td>{x.cenik.split(":")[1]}</td>
                            <td>{x.mnozMjReal}</td>
                            <td><Button variant="danger" onClick={() => deleteHistoryItem(x.id)}>Odstranit</Button></td>
                        </tr >)}
                </tbody>
            </Table>
            <hr />

            <h2>Sečtené položky</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nazev</th>
                        <th>Pocet</th>
                    </tr>
                </thead>
                <tbody>
                    {addedEanItems.map(x =>
                        <tr key={x.id}>
                            <td>{x.cenik.split(":")[1]}</td>
                            <td>{x.mnozMjReal}</td>
                        </tr >)}
                </tbody>
            </Table>
            <hr />

            <h2>Načíst položky</h2>
            <Form.Group className="mb-3">
                <Form.Label>EAN</Form.Label>
                <Form.Control onChange={(e) => { setEan(e.target.value) }} />
            </Form.Group>

            <Button onClick={sendEan} style={{ marginBottom: "1rem" }} >Add</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nazev</th>
                        <th>Pocet</th>
                    </tr>
                </thead>
                <tbody>
                    {eanItems.map(x =>
                        <tr>
                            <td>{x.id}</td>
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
