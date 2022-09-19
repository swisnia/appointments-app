import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'

const SalonGallery = ({salonImages}) => {
  const [images, setImages] = useState()
  const {reduceImageFileSize, addNewSalonImage, deleteSalonImg} = useAppContext()

  const handleImage = (e) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const img = reader.result
      const resizedImg = await reduceImageFileSize(img)
      setImages([...images, {img: resizedImg}])
    }
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    e.target.value = null
  }
  const saveImg = () => {
    const newImage = images[images.length - 1]
    addNewSalonImage(newImage)
  }
  const deleteImg = (e) => {
    const id = e.target.id
    deleteSalonImg(id)
  }
  useEffect(() => {
    setImages(salonImages)
  }, [salonImages])
  
  return (
    <div className='gallery-container'> 
      {images && images.map((e) => {
        return(
          <div className='img-container' key={e._id}>
            <img 
              key={e._id}
              id={e._id}
              className='gallery-img'
              src={e.img}
              alt=''
            />
            {e._id &&
              <button
                id={e._id}
                type='button'
                className='btn btn-block btn-delete-img'
                onClick={deleteImg}
              >
                Usuń to zdjęcie
              </button>
            }
            {!e._id && 
              <button
                type='button'
                className='btn btn-block btn-delete-img'
                onClick={saveImg}
              >
                Zapisz
              </button>
            }
          </div>
        ) 
      })}
      <div className='img-container new-img'>
        <label
          htmlFor='addSalonImg'
          className='btn btn-block'

        >
          Dodaj zdjęcie
        </label>
        <input
          id='addSalonImg'
          type='file'
          name='salonImg'
          accept='image/*'
          onChange={handleImage}
        />            
      </div>
    </div>
  )
}

export default SalonGallery