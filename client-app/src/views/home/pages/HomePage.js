import React from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default function HomePage() {

    const get = async () => {
        var data = await axios.get("/WeatherForecast");
        console.log(data);
    }

    const tryGet = async () => {
        var data = await axios.get("/WeatherForecast/try");
        console.log(data);
    }

    return (
        <>
            <p>HomePage</p>
            <Button variant="primary" onClick={get}>Get</Button>
            <Button variant="warning" onClick={tryGet}>Try</Button>
        </>
    );
}
