import React from 'react'
import {MdRadioButtonUnchecked, MdOutlineCheckCircleOutline} from 'react-icons/md'

const SideBar = ({page}) => {
  return (
    <div className='sidebar-container'>
        <h4>Etapy rejestracji</h4>
        <div>
            <h5><MdOutlineCheckCircleOutline className='reg-img'/> podstawowe dane</h5>
            <h5>{page > 2 ? <MdOutlineCheckCircleOutline className='reg-img'/> : <MdRadioButtonUnchecked />} dane firmy</h5>
            <h5>{page > 3 ? <MdOutlineCheckCircleOutline className='reg-img'/> : <MdRadioButtonUnchecked />} godziny otwarcia</h5>
            <h5>{page > 4 ? <MdOutlineCheckCircleOutline className='reg-img'/> : <MdRadioButtonUnchecked />} pracownicy</h5>
            <h5>{page > 5 ? <MdOutlineCheckCircleOutline className='reg-img'/> : <MdRadioButtonUnchecked />} usługi</h5>
            <h5>{page > 6 ? <MdOutlineCheckCircleOutline className='reg-img'/> : <MdRadioButtonUnchecked />} zdjęcia</h5>
        </div>
    </div>
  )
}

export default SideBar