import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';

function App() {
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
      <Fragment>
        Habilite a localização no browser!
      </Fragment>
    )
  } else if (!weather) {
    return (
      <Fragment>
        Carregando...
      </Fragment>
    )
  }
  else {
    console.log(weather);
    let icon = weather['list'][0]['weather'][0]['icon']

    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['list'][0]['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['list'][0]['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['list'][0]['main']['temp_max']}°</li>
          <li>Temperatura mínima: {weather['list'][0]['main']['temp_min']}°</li>
          <li>Pressão: {weather['list'][0]['main']['pressure']}°</li>
          <li>Umidade: {weather['list'][0]['main']['humidity']}%</li>
          <img src= {"https://openweathermap.org/img/w/" +icon+ ".png"} style={{width: 80}}></img>
          {/* <li>Umidade: {weather['daily'][1]}%</li> */}
        </ul>
        <h3>Clima nas suas Coordenadas ({weather['list'][0]['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['list'][1]['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['list'][1]['main']['temp_max']}°</li>
          <li>Temperatura mínima: {weather['list'][1]['main']['temp_min']}°</li>
          <li>Pressão: {weather['list'][1]['main']['pressure']}°</li>
          <li>Umidade: {weather['list'][1]['main']['humidity']}%</li>
          <img src= {"https://openweathermap.org/img/w/" +icon+ ".png"} style={{width: 80}}></img>
          {/* <li>Umidade: {weather['daily'][1]}%</li> */}
        </ul>
      </Fragment>
    );
  }
}


export default App;
