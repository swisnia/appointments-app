import React from 'react'
import Wrapper from '../assets/wrappers/Bottombar'
import {FaTimes} from 'react-icons/fa'
import {useAppContext} from '../context/appContext'
import NavLinks from './NavLinks'
import Logo from './Logo'

const Bottombar = () => {
  const {showSidebar, toggleSidebar} = useAppContext()
  return (
    <Wrapper>
      <div className='bottombar-container'>
        <NavLinks smallSidebar={false}/>
      </div>
    </Wrapper>
  )
}

export default Bottombar