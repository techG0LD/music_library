import Gallery from './components/Gallery';
import './App.css';
import {useState,useEffect, useRef} from 'react'
import SearchBar from './components/SearchBar';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';

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
      <SearchContext.Provider value={{term: searchInput, handleSearch:handleSearch}}>
        < SearchBar/>
        </SearchContext.Provider>
      
      {message}
      <DataContext.Provider value={data}>
         <Gallery />
      </DataContext.Provider>
     
    </div>
  )
}

export default App;
