import React from 'react'

const CalendarSidebar = ({rows}) => {

  return (
    <div id='calendar-sidebar'>
       {rows && rows.map((e, index) => {
        return(
            <h5 
                key={index} 
            >
                {e}
            </h5>
        )
       })} 
    </div>
  )
}

export default CalendarSidebar