import './App.css';
import {useState,useEffect} from 'react'
import SearchBar from './components/SearchBar';


function App() {
  
  const [data,setData] = useState([])
  const [message,setMessage] = useState('Search for Music!')
  const searchInput = useRef('')

  const API_URL = "https://itunes.apple.com/search?term="

  

  const handleSearch = (e,term) => {
    e.preventDefault()


    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if(resData.results.length){
        return setData(resData.results) 
      } else {
        return setMessage("Not found")
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch}/>
      {message}
      <Gallery data={data}/>
    </div>
  )
}

export default App;
