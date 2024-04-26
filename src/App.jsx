import { useEffect, lazy } from 'react'
import Content from './components/Content'
import Searchbar from './components/Searchbar'
import { useSelector, useDispatch } from 'react-redux'
import { getContentList,  increamentLimit, increamentPage } from './features/content/contentSlice'

function App() {
  const {contentList, isFilter, filterStr, limit, pageNo} = useSelector((store) => store.content)
  const dispatch = useDispatch()

  function handleScroll() {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      dispatch(increamentLimit())
    }
  }

  useEffect(() => {
    dispatch(getContentList())   
  }, [pageNo])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  function filterContent(){
    console.log("limit filter = "+ limit)
    if(filterStr.length === 0){
      return <div className='suggestions'>Suggestions: <span>The Birds</span></div>
    }
    const filterContent = contentList.filter(obj => obj.name.toLowerCase().includes(filterStr))
    if(limit <= filterContent.length){
      return filterContent.map((obj,i) => {
        return (
          <Content key={i} name={obj.name} image={obj['poster-image']} />
        )
      })  
    }
    return filterContent.map((obj,i) => {
      return (
        <Content key={i} name={obj.name} image={obj['poster-image']} />
      )
    })
  }

  function content(){
    // console.log("limit = "+ limit)
    console.log("pageNo = "+ pageNo)
    if(limit > 18)
      dispatch(increamentPage())
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
          isFilter ? filterContent() : content() 
        }
        </div>
      </main>
    </div>
  )
}

export default App
