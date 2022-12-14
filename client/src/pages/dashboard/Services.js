import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Services'
import { SingleService, AddService, YesOrNotAlert } from '../../components'
import { useAppContext } from '../../context/appContext'
import {AiOutlineDown} from 'react-icons/ai'

const Services = () => {
  const {firm, deleteServices} = useAppContext()
  const [showAddService, setShowAddService] = useState(false)
  const [servicesToDelete, setServicesToDelete] = useState([])
  const [showAlert, setShowAlert] = useState(false)

  const sortServices = () => {
    let newServices = []
    firm.services.forEach( (e) => {
      const index = newServices.map((obj) => obj.serviceCategory).indexOf(e.serviceCategory)
      if(index !== -1){
          newServices[index].services = [...newServices[index].services, {
            serviceName: e.serviceName,
            serviceTime: e.serviceTime,
            servicePrice: e.servicePrice,
            _id: e._id
          }]
        } else {       
          newServices = [...newServices, {
            serviceCategory: e.serviceCategory,
            //show: true,
            services: [{
              serviceName: e.serviceName,
              serviceTime: e.serviceTime,
              servicePrice: e.servicePrice,
              _id: e._id
            }]
          }]
        }
      }
    );
    return newServices
  }
  const services = sortServices()
  const hideAddService = () => {
    setShowAddService(false)
  }
  const addToDelete = (e) => {
    const _id = e.target.parentElement.id
    const checked = e.target.checked
    if(checked === true) {
      setServicesToDelete([...servicesToDelete, _id])
    } else {
      const filteredArray = servicesToDelete.filter(e => e !== _id)
      setServicesToDelete(filteredArray)
    }
  }
  const checkIfChecked = (_id) => {
    if(!Array.isArray(servicesToDelete) || servicesToDelete.indexOf(_id) === -1) return false
    else return true
  }
  const removeServices = () => {
    deleteServices(servicesToDelete) 
    setServicesToDelete([])
    setShowAlert(false)
  }
  return (
    <Wrapper>
      {showAlert&& 
        <YesOrNotAlert 
          alertText='Czy na pewno chcesz usun???? te us??ugi?'
          onYes={removeServices}
          onNot={()=> setShowAlert(false)}
        />
      }
      <h4>Us??ugi</h4>
      <header>
        <SingleService 
          name='nazwa us??ugi'
          time='czas'
          price='cena'
        />
      </header>
      <div className='services-container'>
        {firm.services && services.map((obj, index) => {
          return(
            <div 
              key={index}
              className='category-container' 
            > 
              {obj.serviceCategory && 
                <div className='category-name'>
                  <h4>{obj.serviceCategory}</h4>
                  <AiOutlineDown 
                    className='icon-down'
                  />
                </div>
              }
                {/*obj.show && */obj.services.map((e, index) => {
                  const checked = checkIfChecked(e._id)
                  return(
                    <SingleService
                      key={index} 
                      _id={e._id}
                      name={e.serviceName} 
                      time={e.serviceTime}
                      price={e.servicePrice + 'z??'}
                      checked={checked}
                      addToDelete={addToDelete}
                    /> 
                  )
                })}
            </div>
          )
        })}
        {firm.services.length === 0 && 
          <h5 className='info-txt'>Nie dodano jeszcze ??adnych us??ug</h5>
        }
      </div>
      <div className='btn-container'>
        <button
          type='button'
          className='btn btn-hero'
          onClick={() => { setShowAddService(true)}}
        >
          Dodaj us??ug??
        </button>
        <button
          type='button'
          className='btn btn-ghost'
          onClick={() => setShowAlert(true)}
          disabled={servicesToDelete.length === 0}
        >
          Usu?? zaznaczone
        </button>
      </div>
        {showAddService && 
        <AddService
          hideWindow={hideAddService}
        />}
      
    </Wrapper>
  )
}

export default Services