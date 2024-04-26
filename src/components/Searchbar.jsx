import {useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, clearFilter, setFilterStr, defaultLimit } from '../features/content/contentSlice'

export default function Searchbar() {
  const {limit} = useSelector(store => store.content)
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  function handleChange() {
    const str = document.getElementById('searchText').value
    dispatch(setFilterStr(str.toLowerCase()))
  }

  function searchBtn() {
    console.log('search before = '+limit);
    dispatch(defaultLimit())
    console.log('search after = '+limit);
    document.getElementById('searchText').value = ''
    dispatch(setFilter())
    inputRef.current.focus()
  }

  function backBtn() {
    console.log('back before = '+limit);
    dispatch(defaultLimit())
    console.log('back after = '+limit);
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

        <input 
          type="text" 
          id='searchText'
          className='input-bar'
          defaultValue={'Romantic Comedy'}
          onChange={handleChange}
          ref={inputRef}
        />
     
        <img 
          className='search-btn' 
          onClick={searchBtn}  
          src="https://test.create.diagnal.com/images/search.png" 
          alt="search icon" 
        />
    </div>
  )
}
