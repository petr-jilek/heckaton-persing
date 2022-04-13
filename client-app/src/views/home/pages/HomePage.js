import React from 'react';
import { Button, Form, form} from 'react-bootstrap'
import axios from 'axios'

export default function HomePage() {
/*
    const get = async () => {
        var data = await axios.get("/WeatherForecast");
        console.log(data);
    }

    const tryGet = async () => {
        var data = await axios.get("/WeatherForecast/try");
        console.log(data);
    }
*/
    return (
        <>
            
             {/*<p>HomePage</p>
            <Button variant="primary" onClick={get}>Get</Button>
           <Button variant="warning" onClick={tryGet}>Try</Button>*/}
            
            <div>
            <Form.Label htmlFor="inputfirm_name">Enter name of starage</Form.Label>
           {/* <Form.Control
                type="storage_name"
                id="inputstorage_name"
            />*/}
            </div>
            <div></div>
            <select id="storage_name" name="storage_name">
            <option value="Storage1">Storage1</option>
            <option value="Storage2">Storage2</option>
            </select>
            <div>
            <Button onclick="window.location.href='https://www.google.com/';">
                Continue
                </Button>
                </div>
        </>
    );
}
