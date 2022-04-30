import {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [time, setTime] = useState({});
  const [location, setLocation] = useState ('');

  const apikey = '39afd92f191b4c928240b0fd8b1ddcd0';
 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&appid=${apikey}`

  //const timeKey = 'db36a27c208c41938817ea58f2e5310e';
   const baseURL = `https://timezone.abstractapi.com/v1/current_time/?api_key=fe7e55c47b8343f5a8f4072097f8c046&location=${location}`;

   const locationHandler = (e) => {
     e.preventDefault();
      axios.get(url).then(response=>{
        setData(response.data)
        console.log(response.data)
      });
      axios.get(baseURL).then(response=>{
        console.log(response.data)
        setTime(response.data)
      })
     setLocation('')
    
   }
   
  

  return (
    <div className="App">
      <div className='search'>
        <form onSubmit={locationHandler} >
        <input 
      value={location}
      onChange={e => setLocation(e.target.value)}
      placeholder = 'Enter Your City'
      />
        </form>
      
      </div>
      <div className='container'>
        <div className='top'>
          <div>
            <h2 className='location'>{data? data.name : null}, {data.sys? data.sys.country : null}</h2>
            <h1 className='temp'>{data.main? data.main.temp: null} &#8457;</h1>

          </div>
          <div className='description'>
              <h4>{data.weather? data.weather[0].main : null}</h4>
          </div>
          
        </div>
        <div className='middle'>
            <h2>{time? time.datetime : null}</h2>
        </div>
        <div className='buttom'>
          <div className='bottom-container'>
            <div className='feels'>
            <h4>{data.main? data.main.feels_like : null} &#8457;</h4>
              <h6>Feels Like</h6>
            </div>
            <div className='humidity'>
            <h4>{data.main? data.main.humidity : null}%</h4>
              <h6>Humidity</h6>
            </div>
            <div className='wind'>
              <h4>{data.wind? data.wind.speed : null} M/S</h4>
              <h6>Winds</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
