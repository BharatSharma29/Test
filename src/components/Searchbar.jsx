import React, {useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, clearFilter, setFilterStr } from '../features/content/contentSlice'

export default function Searchbar() {
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  function handleChange() {
    const str = document.getElementById('searchText').value
    dispatch(setFilterStr(str))
  }

  function searchBtn() {
    document.getElementById('searchText').value = ''
    dispatch(setFilter())
    inputRef.current.focus()
  }

  function backBtn() {
    dispatch(setFilterStr(''))
    dispatch(clearFilter())
    document.getElementById('searchText').value = 'Romantic Comedy'
  }
  
  return (
    <div className='search'>
        <img 
          className='back-btn' 
          onClick={backBtn}  
          src="https://test.create.diagnal.com/images/Back.png" 
          alt="back button" 
        />
        {/* <h2 className='title'>Romantic dates</h2> */}
        <input 
          type="text" 
          id='searchText'
          className='input-bar'
          defaultValue={'Romantic Comedy'}
          onChange={handleChange}
          ref={inputRef}
        />
        {/* <img className='search-bar' src="https://test.create.diagnal.com/images/nav_bar.png" alt="search bar" /> */}
        <img 
          className='search-btn' 
          onClick={searchBtn}  
          src="https://test.create.diagnal.com/images/search.png" 
          alt="search icon" 
        />
    </div>
  )
}
