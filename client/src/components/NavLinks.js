import React from 'react'
import firmLinks from '../utils/firmLinks'
import {NavLink} from 'react-router-dom'

const NavLinks = ({toggleSidebar, smallSidebar}) => {
  return (
    <div className='nav-links'> 
        {firmLinks.map((link)=>{
        const {id, text, path, icon} = link

        return (
            <NavLink
                to={path}
                key={id}
                onClick={toggleSidebar}
                className={({isActive})=>
                    isActive ? 'nav-link active' : 'nav-link'
                }
            >
                <span className='icon'>{icon}</span>
                {smallSidebar && <div className='nav-txt'>{text}</div>}
            </NavLink>
            )
        })}
    </div>
  )
}

export default NavLinks