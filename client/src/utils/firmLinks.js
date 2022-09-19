import {IoCalendarOutline} from 'react-icons/io5'
import {MdOutlinePeopleAlt} from 'react-icons/md'
import {VscHome} from 'react-icons/vsc'
import {FiSettings} from 'react-icons/fi'
import {FaRegListAlt} from 'react-icons/fa'


const firmLinks = [
    {id: 1, text: 'kalendarz', path: '/', icon: <IoCalendarOutline />},
    {id: 2, text: 'salon', path: 'profile', icon: <VscHome />},
    {id: 3, text: 'pracownicy', path: 'workers', icon: <MdOutlinePeopleAlt />},
    {id: 4, text: 'usługi', path: 'services', icon: <FaRegListAlt />},
    {id: 5, text: 'ustawienia', path: 'settings', icon: <FiSettings />},
]

export default firmLinks