import React, {useState} from 'react'
import {GrNext, GrPrevious} from 'react-icons/gr'
import { useAppContext } from '../../context/appContext'

const StepFive = ({salonImages, addSalonImg, removePicture}) => {
  const [showImg, setShowImg] = useState(0)
  const{reduceImageFileSize} = useAppContext()
 
  const handleChange = (e) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const img = reader.result
      const resizedImg = await reduceImageFileSize(img)
      addSalonImg(resizedImg)
      setShowImg(salonImages.length)
    }
    if(e.target.files[0]){
    reader.readAsDataURL(e.target.files[0])
    }
    e.target.value = null //added later without testing
  }
  const nextPic = () => {
    if(showImg + 1 > salonImages.length -1) return setShowImg(0)
    setShowImg(showImg + 1)
  }
  const prevPic = () => {
    if(showImg - 1 < 0) return setShowImg(salonImages.length -1)
    setShowImg(showImg - 1) 
  }
  const handleRemove = () => {
    if(salonImages.length > 0){
      removePicture(showImg) 
      setShowImg(0)
    }
  }
  return (
    <div>
      <h4>Dodaj zdjęcia</h4>
      <div className='picture-container'>
        {salonImages.map((img, index) => {
          return <img 
            key={index} 
            src={img.img} 
            alt=''
            draggable='false'
            className={showImg === index ?'img-visible' : 'img-invisible'}
          />
          
        })}
        <div className='switch-img-btn-container'>
          <GrPrevious className='switch-img-btn' onClick={prevPic}/>
          <GrNext className='switch-img-btn' onClick={nextPic}/>
        </div>
      </div>
      <div className='btn-container'>
        <button 
        type='button'
        className='btn btn-ghost'
        onClick={handleRemove}
        disabled = {salonImages.length < 1}
        >
          usuń to zdjęcie
        </button>
        <label htmlFor='addSalonImg' className='btn btn-hero'>
            dodaj zdjęcie
        </label>
      </div>
      <input
        id='addSalonImg'
        type='file'
        name='salonImg'
        accept='image/*'
        onChange={handleChange}
      >
      </input>
    </div>
  )
}

export default StepFive