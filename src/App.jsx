import { useEffect, useState } from 'react'
import Content from './components/Content'
import Searchbar from './components/Searchbar'
import { useSelector, useDispatch } from 'react-redux'
import { setContentList } from './features/content/contentSlice'

function App() {
  const {contentList, isFilter, filterStr} = useSelector((store) => store.content) // extracting state values from the store
  const dispatch = useDispatch() // dispacting actions
  const [pageNo, setPageNo] = useState(1) // for making API calls to different pages
  const [limit, setLimit] = useState(18) // for limiting the content on the page

  /** Handling the scroll event by using document and window objects */
  function handleScroll() {
    if((window.innerHeight + document.documentElement.scrollTop + 2 >= document.documentElement.scrollHeight) && pageNo < 3){
      setLimit(prev => prev + 18)
      setPageNo(prev => prev + 1)
    }
  }

  /** Making API calls for extrating data based on pages */
  useEffect(() => {
    const controller = new AbortController()
    if(pageNo <= 3){
      fetch(
        `https://test.create.diagnal.com/data/page${pageNo}.json`, {signal: controller.signal}
      )
        .then((res) => res.json())
        .then(data => {
          const apiArr = data.page["content-items"].content
          dispatch(setContentList([...contentList, ...apiArr]))
        })
        .catch((err) => console.log(err));   
    }
      return () => controller.abort() // cleaning up the side effect created
  }, [pageNo]) // pageNo in the dependency array so it calls the API every time it changes


  /** Adding event listener for listening to scroll event */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // cleaning up the even listener
  },[])// keeping it empty so that it only runs once

  
  /** Filtering content based on the input string from the user */
  function filterContent(){
    if(filterStr.length === 0){
      return <div className='suggestions'>Suggestions: <span className='list'>The Birds</span></div>
    }
    const filterContent = contentList.filter(obj => obj.name.toLowerCase().includes(filterStr))
    if(filterContent.length === 0){
      return <div className='not-found'>No results found</div>
    }

    return filterContent.map((obj,i) => {
      return (
        <Content key={i} name={obj.name} image={obj['poster-image']} />
      )
    })
  }

  /** Displaying content returned by the api */
  function content(){
    return contentList.slice(0, limit).map((obj,i) => {
      return (
        <Content key={i} name={obj.name} image={obj['poster-image']} />
      )
    })  

  }

  return (
    <div className='content-list'>
      <header>
        <Searchbar />
      </header>

      <main>
        <div className='content'>
        {
          isFilter ? filterContent() : content() // displaying content based on if user is searching or browsing 
        }
        </div>
      </main>
    </div>
  )
}

export default App
