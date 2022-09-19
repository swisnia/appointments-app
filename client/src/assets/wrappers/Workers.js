import styled from 'styled-components'

const Wrapper = styled.section`
    
    .workers-sidebar-big{
        display: none;
    }
    .workers-sidebar-big .btn{
        width: 90%;
        margin: 1rem 5% 1rem 5%;
    }
    h5{
        padding: 0.3rem 1rem;
        text-align: center;
        border-bottom: 1px solid var(--secondary-200);
    }
    .worker-nav{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background-color: var(--backgroundColor);
        border-top-right-radius: var(--boxRadius);
    }
    .worker-nav h5{
        /*border-right: 1px solid var(--secondary-200);*/
        /*color: var(--secondary-400);*/
        border-bottom: none;
    }
    .worker-nav h5:hover{
        cursor: pointer;
        background-color: var(--secondary-200);
        color: var(--secondary-600);
    }
    .active{
        background-color: var(--white);
        color: var(--secondary-600);
    }
    .no-active{
        color: var(--secondary-400) 
    }
    .content{
        /*padding: 2rem;*/
    }
    .photo-and-about-container{
        padding: 2rem;
        border-bottom: 1px solid var(--secondary-200);
    }
    .photo-container{
        text-align: center;
    }
    .photo-container .btn{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: small;
        margin-bottom: 1rem;
    }
    .worker-photo{
        height: 9rem;
        width: 9rem;
        object-fit: cover;
        border: 1px solid var(--secondary-600);
        border-radius: var(--borderRadius);
    }
    .worker-data-container{
        padding: 2rem;
    }
    .worker-data-container small{
        color: var(--secondary-400);
    }
    .content h6{
        font-weight: bold;
        padding: 2rem 2rem 0 2rem;
    }
    .btn-container{
        padding: 0 2rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    .about-container textarea{
        width: 100%;
        min-height: 5rem;
        height: 100%;
        resize: none;
    }
    #addWorkerPhoto{
        display: none;
    }
    .worker-service{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.35rem 2rem;
    }
    .worker-service h6{
        padding: 0;
    }
    .services-container header {
        background-color: var(--backgroundColor);
        color: var(--secondary-500);
        margin-top: 1rem;
    }
    .working-hours-container{
        padding: 2rem;
    }
    .working-hours-container h6{
        padding: 0;
    }
    .weekday-container {
        display: grid;
        /*grid-template-columns: 3fr 1fr;*/
        align-items: center;
    }
    .day-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.7rem;
    }
    .day-container h5{
        border: none;
    }
    .day-container input {
        height: 40px;
    }
    @media (min-width: 992px) {
        border: 1px solid var(--secondary-200);
        border-radius: var(--boxRadius);
        display: grid;
        grid-template-columns: 1.2fr 4fr;
        height: 100%;
        .btn-container{
            grid-template-columns: 1fr 1fr;
        }
        .workers-sidebar-big{
            /*width: 25%; /*do zmiany na display grid*/
            display: block;
            height: 100%;
            border-right: 1px solid var(--secondary-200);
            color: var(--secondary-600);
        }
        .photo-and-about-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .photo-container{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
            align-items: flex-end;
        }
        .photo-container .btn{
            margin-bottom: 0;
        }
        .worker-data-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
        }
    }
`

export default Wrapper