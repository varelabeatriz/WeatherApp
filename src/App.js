import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
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

  if (location == false) {
    return (
      <Fragment>
        Habilite a localização no browser!
      </Fragment>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        Carregando...
      </Fragment>
    )
  }
  else {

    let icon = weather['weather'][0]['icon']

    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura mínima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']}°</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
          <img src= {"https://openweathermap.org/img/w/" +icon+ ".png"} style={{width: 80}}></img>
          {/* <li>Umidade: {weather['daily'][1]}%</li> */}
        </ul>
      </Fragment>
    );
  }
}


export default App;
