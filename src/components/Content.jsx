import React from 'react'

export default function Content({name, image}) {
  return (
    <div className='one-show'>
        <img src={`https://test.create.diagnal.com/images/${image}`} alt="poster image" />
        <h4>{name}</h4>
    </div>
  )
}
