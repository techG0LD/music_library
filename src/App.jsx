import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import {useState,useEffect} from 'react'
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView'

function App() {
  const [search,setSearch] = useState("")
  const [data,setData] = useState([])
  const [message,setMessage] = useState('Search for Music!')

  const API_URL = "https://itunes.apple.com/search?term="

  useEffect(() => {
    if(search){
      const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(API_URL + search)
      const resData = await response.json()
      if(resData.results.length){
        return setData(resData.results) 
      } else {
        return setMessage("Not found")
      }
      
    }
    fetchData()
    }
    
  },[search])

  const handleSearch = (e,term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>

          <Route path='/' element= {
             //fragment does not work so liv carrots blank works similarly
             <>                  
              <SearchBar handleSearch={handleSearch}/>
              <Gallery data={data}/>
            </>
          }/>

          <Route path='/album/:id' element={<AlbumView/>}/>
          <Route path="/artist/:id" element={ <ArtistView/>}/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App;
