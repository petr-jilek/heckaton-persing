import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function InventuraDetailPage() {
    let { id } = useParams();

    const [item, setItem] = useState({})

    const [ean, setEan] = useState("")

    const [eanItems, setEanItems] = useState([])

    const [addedEanItems, setAddedEanItems] = useState([])

    const [souctovePolozky, setSouctovePolozky] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        get()
    }, []);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await sendEan()
        }
    }


    const get = async () => {
        var data = await axios.get(`firma1/inventura/${id}`);
        setItem(data.winstrom.inventura[0])

        var addedEans = await axios.get(`https://inventura.flexibee.eu/v2/c/firma1/inventura-polozka/%28inventura%3D${data.winstrom.inventura[0].id}%29?detail=custom%3Aid%2Csklad%2CdatZahaj%2CmnozMjReal%2Ccenik&limit=100&offset=0`)
        setAddedEanItems(addedEans.winstrom["inventura-polozka"])

        var souctove = []

        const uzje = (item) => {
            for (var i = 0; i < souctove.length; i++) {
                if (souctove[i].cenik === item.cenik) {
                    return true
                }
            }
            return false
        }

        const update = (item) => {
            for (var i = 0; i < souctove.length; i++) {
                if (souctove[i].cenik === item.cenik) {
                    souctove[i].mnozMjReal += item.mnozMjReal
                    return
                }
            }
        }

        for (var i = 0; i < addedEans.winstrom["inventura-polozka"].length; i++) {
            if (uzje(addedEans.winstrom["inventura-polozka"][i])) {
                update(addedEans.winstrom["inventura-polozka"][i])
            }
            else {
                souctove.push({
                    cenik: addedEans.winstrom["inventura-polozka"][i].cenik,
                    mnozMjReal: addedEans.winstrom["inventura-polozka"][i].mnozMjReal
                })
            }
        }

        setSouctovePolozky(souctove)
    }

    const sendEan = async () => {
        var data = await axios.get(`https://inventura.flexibee.eu/v2/c/firma1/skladova-karta/%28sklad%20%3D%20%22${item.sklad}%22%20and%20ucetObdobi%20%3D%20%22code%3A2022%22%20and%20cenik%3D%22ean%3A${ean}%22%29?detail=full&limit=10&offset=0`)

        var eItems = data.winstrom["skladova-karta"]

        if (eItems.length > 0) {
            if (eanItems.filter(x => x.cenik === eItems[0].cenik).length > 0) {
                var data = eanItems;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].cenik === eItems[0].cenik) {
                        data[i].mycount++;
                        setEanItems(data)
                        toast.success("Předmět přidán")
                        return
                    }
                }

                toast.error("EAN již nahrán")
            }
            else {
                eItems[0]["mycount"] = 1
                setEanItems([...eanItems, eItems[0]])
                toast.success("Předmět přidán")
            }
        }
        else {
            toast.error("Žádný produkt pro tento EAN")
        }

        setEan("")
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

        setEanItems([])
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

        toast.success("Položka odstraňena")

        await get()
    }

    const deleteI = async () => {
        axios.delete(`firma1/inventura/${item.id}`)

        navigate("/inventura")
    }

    return (
        <div className='HomeViewPage_container_div'>
            <h1>Detail Inventury</h1>
            <h4>Název inventury</h4>
            <p>{item.typInventury}</p>
            <h4>Datum Zahájení</h4>
            <p>{item.datZahaj}</p>
            <h4>Stav</h4>
            <p>{item.stavK}</p>
            <h4>Sklad</h4>
            <p>{item.sklad}</p>

            <Button variant="danger" onClick={deleteI}>Odstranit inventuru</Button>
            <hr />

            <h2>Historie přidání</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Počet</th>
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

            <br />
            <br />

            <h2>Sečtené položky</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Počet</th>
                    </tr>
                </thead>
                <tbody>
                    {souctovePolozky.map(x =>
                        <tr key={x.id}>
                            <td>{x.cenik.split(":")[1]}</td>
                            <td>{x.mnozMjReal}</td>
                        </tr >)}
                </tbody>
            </Table>
            <hr />

            <br />
            <br />

            <h2>Načíst položky</h2>
            <Form.Group className="mb-3">
                <Form.Label>EAN</Form.Label>
                <Form.Control onChange={(e) => { setEan(e.target.value) }} value={ean} onKeyDown={handleKeyDown} />
            </Form.Group>

            <Button onClick={sendEan} style={{ marginBottom: "1rem" }} >Přidat</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Název</th>
                        <th>Počet</th>
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
            <Button onClick={saveEanItems}>Uložit</Button>
        </div>
    );
}
