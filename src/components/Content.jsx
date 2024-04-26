import React from 'react'

/** Component to show individual content */
export default function Content({name, image}) {
  /** checks if the image is missing */
  if(image === "posterthatismissing.jpg"){
    image = 'placeholder_for_missing_posters.png'
  }

  return (
    <div className='one-show'>
        <img src={`https://test.create.diagnal.com/images/${image}`} alt="poster image" />
        <h4>{name}</h4>
    </div>
  )
}
