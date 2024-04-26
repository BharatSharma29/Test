import { useEffect, useState } from 'react'
import Content from './components/Content'
import Searchbar from './components/Searchbar'
import { useSelector, useDispatch } from 'react-redux'
import { getContentList } from './features/content/contentSlice'

function App() {
  // const [data, setData] = useState([])
  const {contentList, isFilter, filterStr} = useSelector((store) => store.content)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContentList())   
  }, [])

  function filterContent(){
    if(filterStr.length === 0){
      return <div className='suggestions'>Suggestions: <span>The Birds</span></div>
    }
    return contentList.filter(obj => obj.name.toLowerCase().includes(filterStr)).map((obj,i) => {
      return (
        <Content key={i} name={obj.name} image={obj['poster-image']} />
      )
    })
  }

  function content(){
    return contentList.map((obj,i) => {
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
          {/* {
              contentList.map((obj,i) => {
                return (
                  <Content key={i} name={obj.name} image={obj['poster-image']} />
                )
              }) */}
        </div>
      </main>
    </div>
  )
}

export default App
