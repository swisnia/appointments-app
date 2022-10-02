import React, {useState, useEffect} from 'react'
import { 
  WorkersSidebar, 
  WorkerData, 
  WorkerServices, 
  WorkingHours,
  AddWorker,
  YesOrNotAlert 
} from '../../components'
import Wrapper from '../../assets/wrappers/Workers'
import { useAppContext } from '../../context/appContext'

const initialState = {
  page: 1,
  currentWorker: '',
  showAddWorker: false,
  showAlert: false 
}

const Workers = () => {
  const [values, setValues] = useState(initialState)
  const {firm, deleteWorker} = useAppContext()

  const handlePage = (page) => {
    setValues({...values, page: page})
  }
  const setWorker = (e) => {
    const _id = e.currentTarget.id
    const currentWorker = firm.workers.filter((obj) => {return obj._id === _id})
    setValues({...values, currentWorker: currentWorker[0]})
  }
  const toggleAddWorker = () => {
    setValues({...values, showAddWorker: !values.showAddWorker})
  }
  const removeWorker = () => {
    const workerId = values.currentWorker._id
    deleteWorker(workerId)
    handleAlert()
  }
  const handleAlert = () => {
    setValues({...values, showAlert: !values.showAlert})
  }
  useEffect(() => {
    setValues({...values, currentWorker: firm.workers[0]})
    // eslint-disable-next-line
  }, [firm])
  
  return (
    <Wrapper>
      {values.showAlert && <YesOrNotAlert 
        alertText='Czy na pewno chcesz usunąć tego pracownika?'
        onYes={removeWorker}
        onNot={handleAlert}
      />}
      {values.showAddWorker &&  
      <AddWorker 
        hideWindow={toggleAddWorker} 
        openingHours={firm.openingHours}
      />}
      <WorkersSidebar 
        workers = {firm.workers}
        setWorker = {setWorker}
        showAddWorker = {toggleAddWorker}
      />
      <nav>
        <div className='worker-nav'>
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
            Usługi
          </h5>
        </div>
        <div className='content'>
          {values.page === 1 && 
            <WorkerData 
              currentWorker={values.currentWorker} 
            />
          }
          {values.page === 2 && 
            <WorkingHours 
              currentWorker={values.currentWorker} 
            />
          }
          {values.page === 3 && 
            <WorkerServices 
              currentWorker={values.currentWorker}  
              services={firm.services}            
            />
          }
          <button
            type='button'
            className='btn-delete-worker'
            onClick={handleAlert}
          >
            Usuń pracownika
          </button>
        </div>
      </nav>
    </Wrapper>
  )
}

export default Workers 