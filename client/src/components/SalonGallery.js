import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {YesOrNotAlert} from '../components'

const SalonGallery = ({salonImages}) => {
  const [images, setImages] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [deleteImageId, setDeleteImageId] = useState()
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
  const saveImg = (e) => {
    const newImage = images[images.length - 1]
    addNewSalonImage(newImage)
  }
  const setImageToDelete = (e) => {
    const id = e.target.id
    setDeleteImageId(id)
    setShowAlert(true)
  }
  const deleteImg = () => {
    deleteSalonImg(deleteImageId)
    setShowAlert(false)
  }
  useEffect(() => {
    setImages(salonImages)
  }, [salonImages])
  
  return (
    <div className='gallery-container'> 
      {showAlert && 
        <YesOrNotAlert 
          alertText='Czy na pewno chcesz usunąć to zdjęcie?'
          onYes={deleteImg}
          onNot={()=> setShowAlert(false)}
        />
      }
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
                onClick={setImageToDelete}
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