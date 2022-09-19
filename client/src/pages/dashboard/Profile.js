import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Profile'
import { useAppContext } from '../../context/appContext'
import {RiStarFill, RiStarHalfFill, RiStarLine} from 'react-icons/ri'
import {GrNext, GrPrevious} from 'react-icons/gr'
import {
  SalonData,
  SalonHours,
  SalonGallery,
  SalonOpinions,
} from '../../components'

const initialState = {
  showImg: 0,
  page: 1,
}

const Profile = () => {
  const [values, setValues] = useState(initialState)
  const {firm} = useAppContext()
  
  const nextPic = () => {
    if(values.showImg + 1 > firm.salonImages.length -1) return setValues({...values, showImg: 0})
    setValues({...values, showImg: values.showImg + 1})
  }
  const prevPic = () => {
    if(values.showImg - 1 < 0) return setValues({...values, showImg: firm.salonImages.length -1})
    setValues({...values, showImg: values.showImg - 1})
  }
  const handlePage = (page) => {
    setValues({...values, page: page})
  }
  
  return ( 
    <Wrapper>
      <div className='firm-data-container'>
        <nav>
          <h5
            onClick={() => {handlePage(1)}}
            className={values.page === 1 ? 'active' : 'no-active'}
          >
            Dane
          </h5>
          <h5
            onClick={() => {handlePage(2)}}
            className={values.page === 2 ? 'active' : 'no-active'}
          >
            Godziny
          </h5>
          <h5
            onClick={() => {handlePage(3)}}
            className={values.page === 3 ? 'active' : 'no-active'}
          >
            Galeria
          </h5>
          <h5
            onClick={() => {handlePage(4)}}
            className={values.page === 4 ? 'active' : 'no-active'}
          >
            Opinie
          </h5>
        </nav>
        <div className='content'>
          {values.page === 1 && 
            <SalonData 
              firm={firm}
            />
          }
          {values.page === 2 && 
            <SalonHours 
              openingHours={firm.openingHours}
            />
          }
          {values.page === 3 && 
            <SalonGallery 
              salonImages={firm.salonImages}
            />
          }
          {values.page === 4 && 
            <SalonOpinions />
          }
        </div>
      </div>
      <div className='firm-info-container'>
        <div className='profile-images-container'>
          {firm.salonImages.map((e, index) => {
            return(
              <img
                key={index}
                src={e.img}
                alt=''
                className={values.showImg === index ?'profile-image img-visible' : 'profile-image img-invisible'}
              />
            )
          })}
          <div className='switch-img-btn-container'>
            <GrPrevious className='switch-img-btn' onClick={prevPic}/>
            <GrNext className='switch-img-btn' onClick={nextPic}/>
          </div>
        </div>
        <div className='profile-sidebar-container'>
          <h6>Salon fryzjerski</h6>
          <h4>{firm.companyName}</h4>
          <address>{firm.adress}</address>
          <div className='star-rate-container'>
            <RiStarFill />
            <RiStarFill />
            <RiStarFill />
            <RiStarHalfFill />
            <RiStarLine />
          </div>
          <p>Średnia ocen: 3.57</p>
          {/*<p className='firm-about'>
            {firm.about}
          </p>*/}
        </div>
      </div>

    </Wrapper>
  )
}

export default Profile