import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import './Forecast.css'

function Forecast() {
    const [location, setLocation] = useState(false);
    const [weather, setWeather] = useState(false);

    let getWeather = async (lat, long) => {
        let res = await axios.get("http://api.openweathermap.org/data/2.5/forecast", {
            params: {
                lat: lat,
                lon: long,
                appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
                // lang: 'pt',
                units: 'metric'
            }
        });
        setWeather(res.data);
        console.log(res.data);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setLocation(true)
        })
    }, []);

    if (!location) {
        return (
            <>
                Habilite a localização no browser!
            </>
        )
    } else if (!weather) {
        return (
            <>
                Carregando...
            </>
        )
    }
    else {
        let icon = weather['list'][0]['weather'][0]['icon']
        let icon1 = weather['list'][1]['weather'][0]['icon']
        let icon2 = weather['list'][2]['weather'][0]['icon']
        let icon3 = weather['list'][3]['weather'][0]['icon']
        let icon4 = weather['list'][4]['weather'][0]['icon']

        return (

            <div className="container">

                <div className="header">
                    <p>{weather['city']['name']}</p>
                    <p className="temp">{weather['list'][0]['main']['temp']}°</p>
                    <p>{weather['list'][0]['weather'][0]['description']}</p>
                    <div className="maxAndMin">
                        <p>Máx: {weather['list'][0]['main']['temp_max']}°</p>
                        <p>Mín: {weather['list'][0]['main']['temp_min']}°</p>
                    </div>
                </div>

                <div className="forecastRow">

                    <div className="hourlyForecastS">
                        <p>Agora</p>
                        <img src={"https://openweathermap.org/img/w/" + icon + ".png"}></img>
                        <p>{weather['list'][0]['main']['temp']}°</p>
                    </div>

                    <div className="hourlyForecastS">
                        <p>{weather['list'][1]['dt_txt']}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon1 + ".png"}></img>
                        <p>{weather['list'][1]['main']['temp']}°</p>
                    </div>

                    <div className="hourlyForecastS">
                        <p>{weather['list'][2]['dt_txt']}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon2 + ".png"}></img>
                        <p>{weather['list'][2]['main']['temp']}°</p>
                    </div>

                    <div className="hourlyForecastS">
                        <p>{weather['list'][3]['dt_txt']}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon3 + ".png"}></img>
                        <p>{weather['list'][3]['main']['temp']}°</p>
                    </div>

                    <div className="hourlyForecastS">
                        <p>{weather['list'][4]['dt_txt']}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon4 + ".png"}></img>
                        <p>{weather['list'][4]['main']['temp']}°</p>
                    </div>

                </div>
                
               <br></br>

                <p>Pressão: {weather['list'][0]['main']['pressure']}°</p>
                <p>Umidade: {weather['list'][0]['main']['humidity']}%</p>

            </div>
        );
    }
}


export default Forecast;