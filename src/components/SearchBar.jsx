import {useState} from 'react'

export default function SearchBar(props){
    const [searchTerm,setSearchTerm] = useState("")

    return (
            <form onSubmit={(e) => props.handleSearch(e,searchTerm) }>
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search for music'/>
                <button type="submit">Search</button>
            </form>
    )
}