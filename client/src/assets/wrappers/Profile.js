import styled from 'styled-components'

const Wrapper = styled.section`
    display: flex;
    flex-direction: column-reverse;
    .firm-data-container{
        max-height: 100%;
        border-radius: var(--boxRadius);
        background-color: var(--white);
    }
    .firm-info-container{
        height: fit-content;
        background-color: var(--white);
        min-width: 350px;
        border-radius: var(--boxRadius);
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 5rem;
    }
    .profile-images-container{
        width: 100%;
        height: 18rem;
        position: relative;
    }
    .profile-image{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top-left-radius: var(--boxRadius);
        border-top-right-radius: var(--boxRadius);
    }
    .firm-info-container h6 {
        margin-top: 1.5rem;
    }
    h4{
        margin-bottom: 1rem;
    }
    .star-rate-container{
        display: flex;
        justify-content: center;
        padding: 0.5rem;
    }
    .firm-about{
        text-align: center;
        padding: 1rem;
        margin-top: 1rem;
    }
    .img-visible{
        display: block;
    }
    .img-invisible{
        display: none;
    }
    .switch-img-btn-container{
        width: 100%;
        z-index: 2;
        position: absolute;
        top: calc(50% - 1.5rem);
        display: flex;
        justify-content: space-between;
    }
    .switch-img-btn{
        height: 3rem;
        width: 3rem;
    }
    .switch-img-btn:hover{
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.48);
    }
    nav{
        background-color: var(--backgroundColor);
        border-bottom: none;
        /*border-top-left-radius: var(--boxRadius);
        border-top-right-radius: var(--boxRadius);*/
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        color: var(--secondary-400);
    }
    nav h5 {
        padding: 0.3rem 0;
        text-align: center;
    }
    nav h5:hover {
        background-color: var(--secondary-200);
        color: var(--secondary-600);
        cursor: pointer;
    }
    .active{
        background-color: var(--white);
        color: var(--secondary-600);
    }
    .content h6{
        margin-bottom: 1rem;
        font-weight: bold;
    }
    .salon-about{
        width: 100%;
        resize: none;
        height: 6em;
        margin-bottom: 1rem; 
    }
    small{
        color: var(--secondary-400);
    }
    .btn{
        margin-bottom: 1rem;
    }
    .btn-container{
        margin-bottom: 3rem;
    }
    .day-container{
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
    }
    .day-container h5{
        margin-left: 0.5rem;
    }
    .opinions-container{
        text-align: center;
    }
    .gallery-container{
        max-width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /*if column smaller than 320px makes oly 1 column*/
        column-gap: 1rem;
        row-gap: 1rem;
    }
    .gallery-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .btn-delete-img{
        position: absolute;
        bottom: 0;
        right: 1rem;
        width: 50%;
        z-index: 2;
        background-color: var(--white);
    }
    .img-container{
        position: relative;
        min-width: 320px;
        width: 100%;
        height: 250px;
        display: flex;
        align-items: center;
    }
    #addSalonImg{
        display: none;
    }
    .profile-sidebar-container{
        padding-bottom: 2rem;
        text-align: center;
    }
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: 3fr 1.5fr;
        column-gap: 1rem;
        height: 100%;
        background-color: var(--backgroundColor);
        .content{
            padding: 1rem
        }
        .firm-info-container{
            position: sticky;
        }
        .firm-data-container{
            border: solid 1px var(--secondary-200);
        }
        .btn-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
        }
        .street-and-number{
        display: grid;
        grid-template-columns: 4fr 1fr;
        column-gap: 1rem;
        }
        .code-and-city{
            display: grid;
            grid-template-columns: 1fr 3fr;
            column-gap: 1rem;
        }
    }

`

export default Wrapper
