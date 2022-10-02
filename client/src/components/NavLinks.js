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
                end to={path}
                key={id} 
                id={id}
                onClick={toggleSidebar}
                className={({isActive}) =>
                    "nav-link" + (isActive ? " active" : "")
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