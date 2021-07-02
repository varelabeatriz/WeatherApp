import axios from 'axios';
import { useState, useEffect } from 'react';
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
                lang: 'pt',
                units: 'metric'
            }
        });
        setWeather(res.data);

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

        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }

        let date1 = new Date().addHours(3);
        let time1 = date1.toLocaleTimeString([], { hour: '2-digit' });

        let date2 = new Date().addHours(6);
        let time2 = date2.toLocaleTimeString([], { hour: '2-digit' });

        let date3 = new Date().addHours(9);
        let time3 = date3.toLocaleTimeString([], { hour: '2-digit' });

        let date4 = new Date().addHours(12);
        let time4 = date4.toLocaleTimeString([], { hour: '2-digit' });

        let date5 = new Date().addHours(15);
        let time5 = date5.toLocaleTimeString([], { hour: '2-digit' });

        let date6 = new Date().addHours(18);
        let time6 = date6.toLocaleTimeString([], { hour: '2-digit' });

        function arredonda(n) {
            return n.toFixed(0);
        }

        let tempAtual = arredonda(weather['list'][0]['main']['temp']);
        let tempMax = arredonda(weather['list'][0]['main']['temp_max']);
        let tempMin = arredonda(weather['list'][0]['main']['temp_min']);
        let temp3 = arredonda(weather['list'][1]['main']['temp']);
        let temp6 = arredonda(weather['list'][2]['main']['temp_min']);
        let temp9 = arredonda(weather['list'][3]['main']['temp_min']);
        let temp12 = arredonda(weather['list'][4]['main']['temp_min']);
        let temp15 = arredonda(weather['list'][5]['main']['temp_min']);
        let temp18 = arredonda(weather['list'][6]['main']['temp_min']);

        let icon = weather['list'][0]['weather'][0]['icon']
        let icon1 = weather['list'][1]['weather'][0]['icon']
        let icon2 = weather['list'][2]['weather'][0]['icon']
        let icon3 = weather['list'][3]['weather'][0]['icon']
        let icon4 = weather['list'][4]['weather'][0]['icon']
        let icon5 = weather['list'][5]['weather'][0]['icon']
        let icon6 = weather['list'][6]['weather'][0]['icon']

        return (

            <div className="container">

                <div className="header">
                    <p>{weather['city']['name']}</p>
                    <p className="temp">{tempAtual}°</p>
                    <p>{weather['list'][0]['weather'][0]['description']}</p>
                    <div className="maxAndMin">
                        <p>Máx: {tempMax}°</p>
                        <p>Mín: {tempMin}°</p>
                    </div>
                </div>

                <div className="forecastRow">

                    <div className="hourlyForecast">
                        <p>Agora</p>
                        <img src={"https://openweathermap.org/img/w/" + icon + ".png"}></img>
                        <p>{tempAtual}°</p>
                    </div>

                    <div className="hourlyForecast">
                        <p>{time1}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon1 + ".png"}></img>
                        <p>{temp3}°</p>
                    </div>

                    <div className="hourlyForecast">
                        <p>{time2}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon2 + ".png"}></img>
                        <p>{temp6}°</p>
                    </div>

                    <div className="hourlyForecast">
                        <p>{time3}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon3 + ".png"}></img>
                        <p>{temp9}°</p>
                    </div>

                    <div className="hourlyForecast">
                        <p>{time4}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon4 + ".png"}></img>
                        <p>{temp12}°</p>
                    </div>

                    <div className="hourlyForecast">
                        <p>{time5}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon5 + ".png"}></img>
                        <p>{temp15}°</p>
                    </div>

                    <div className="hourlyForecast">
                        <p>{time6}</p>
                        <img src={"https://openweathermap.org/img/w/" + icon6 + ".png"}></img>
                        <p>{temp18}°</p>
                    </div>

                </div>
                <div className="data">
                    <p>Pressão: {weather['list'][0]['main']['pressure']} hPa</p>
                    <p>Umidade: {weather['list'][0]['main']['humidity']}%</p>
                </div>

            </div>
        );
    }
}


export default Forecast;