import styled from 'styled-components'

const Wrapper = styled.aside`
    
    .calendar-navibar{
        width: 100%;
        border-bottom: 1px solid var(--secondary-200);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    }
    .calendar-navibar svg{
        height: 1.5rem;
        width: 1.5rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .calendar-navibar svg:hover{
        cursor: pointer;
    }
    .timetable-container{
        width: 100%; 
        display: flex;
    }
    #calendar-sidebar{
        width: fit-content;
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--secondary-200);
        border-left: 1px solid var(--secondary-200);
    }
    .workers-container{
        width: 100%;
        display: flex;
        border-bottom: 1px solid var(--secondary-200);
        border-right: 1px solid var(--secondary-200);
        border-left: 1px solid var(--secondary-200);
    }
    .distance{
        padding: 0 0.3rem;
        visibility: hidden;
    }
    .worker-name-txt{
        border-left: 1px solid var(--secondary-200);
        width: 100%;
        min-width: 200px;
        text-align: center;
    }
    .calendar-row{
        height: 50px !important;
        border-bottom: 1px solid var(--grey-50);
    }
    #calendar-sidebar h5{
        padding: 0 0.3rem;
        height: 50px !important; 
        text-align: right;
        border-bottom: 1px solid var(--secondary-200);
    }
    .calendar-column{
        min-width: 200px;
        width: 100%;
        height: inherit;
        border-right: 1px solid var(--secondary-200);
        position: relative;
    }
    .appointment-container{
        position: absolute;
        width: 100%;
        background-color: var(--primary-100);
        border-left: solid 3px var(--primary-500);
        border-radius: 0.35rem;
        padding: 0.3rem 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /*overflow: hidden;
        text-overflow: ellipsis;*/
    }
    .delete-appointment-btn{
        height: min-content;
    }
    .delete-appointment-btn:hover{
        cursor: pointer;
    }
    .service-name{
        font-weight: bold;
        font-size: 1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .btn-add-appointment{
        position: sticky;
        bottom: 1.5rem;
        margin-right: 1.5rem;
        float: right;
        width: fit-content;
    }
    @media (min-width: 992px) {
        height: 100%;
        overflow-y: auto;
    }

`
export default Wrapper