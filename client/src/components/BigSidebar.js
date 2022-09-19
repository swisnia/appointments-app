import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'

const BigSidebar = () => {
  const {showSidebar} = useAppContext()
  return (
    <Wrapper>
        <div
          className='sidebar-container show-sidebar'
        >
          <div className='content'>
            <header>
              {showSidebar ? <h3>A</h3> : <h3>Appointments</h3>}
            </header>
            <NavLinks smallSidebar={!showSidebar}/>
          </div>
        </div>
    </Wrapper>
  ) 
}

export default BigSidebar