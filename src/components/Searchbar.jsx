import {useRef} from 'react'
import { useDispatch } from 'react-redux'
import { setFilter, clearFilter, setFilterStr } from '../features/content/contentSlice'

export default function Searchbar() {
  const dispatch = useDispatch() // dispatching actions
  const inputRef = useRef(null) // to control the DOMinput element

  /** handling change in input element */
  function handleChange() {
    const str = document.getElementById('searchText').value
    dispatch(setFilterStr(str.toLowerCase()))
  }

  /** search button */
  function searchBtn() {
    let inputText = document.getElementById('searchText')
    inputText.value = ''
    inputText.disabled = false
    dispatch(setFilter())
    inputRef.current.focus()
  }

  /** back button */
  function backBtn() {
    let inputText = document.getElementById('searchText')
    dispatch(setFilterStr(''))
    dispatch(clearFilter())
    inputText.value = 'Romantic Comedy'
    inputText.disabled = true
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
          minLength='1'
          maxLength='15'
          disabled={true}
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
