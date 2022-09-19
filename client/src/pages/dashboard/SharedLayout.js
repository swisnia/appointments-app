import React from 'react'
import { Outlet} from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Bottombar, Navbar, BigSidebar, Alert, Loading } from '../../components'
import { useAppContext } from '../../context/appContext'

const SharedLayout = () => {
  const {showAlert, isLoading} = useAppContext()
  return (
    <Wrapper>
      {isLoading && <Loading center={true}/>}
      <main className='dashboard'> 
        <BigSidebar />
        <Bottombar />
        <div className='dashboard-page-container'>
          <Navbar />
          {showAlert && <Alert />}
          <div className='dashboard-page'>
            <Outlet/>
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout