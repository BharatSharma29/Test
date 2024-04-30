import {LazyLoadImage} from 'react-lazy-load-image-component'


/** Component to show individual content */
export default function Content({name, image}) {
  /** checks if the image is missing */
  if(image === "posterthatismissing.jpg"){
    image = 'placeholder_for_missing_posters.png'
  }

  // Lazy loding the image
  return (
    <div className='one-show'> 
        <LazyLoadImage 
          className='img'
          src={`https://test.create.diagnal.com/images/${image}`}  
          alt="poster image" 
          placeholderSrc='https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'
          effect='blur'
        />
        <h4 className='title' title={name}>{name}</h4>
    </div>
  )
}
