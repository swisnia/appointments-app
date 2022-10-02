import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useAppContext } from '../context/appContext'
//import Logo from './Logo'


const Navbar = () => {
    const {toggleSidebar, logutUser} = useAppContext()
  return (
    <Wrapper>
        <div className='nav-center'>
            <button
                type='button'
                className='toggle-btn'
                onClick={toggleSidebar} 
            >
                <GiHamburgerMenu/>
            </button> 
            <div>
                {/* LOGO*/}
            </div>
            <div className='btn-container'>
                <button
                    type='button'
                    className='user-btn'
                    id='btn-logout'
                    onClick={logutUser}
                    >
                    <FiLogOut />
                </button>
                <h6>Wyloguj</h6>
            </div>
        </div>
    </Wrapper>
  )
}

export default Navbar