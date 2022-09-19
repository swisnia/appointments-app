import styled from 'styled-components'

const Wrapper = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: var(--backgroundShadow);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    .add-service-container{
        display: grid;
        background-color: var(--white);
        padding: 1rem;
        border-radius: var(--boxRadius);
        width: 90%;
    }
    .input-time{
        margin-bottom: 1rem;
    }
    .btn{
        margin-bottom: 1rem;
    }
    h4{
        text-align: center;
    }
    .input{
        margin-bottom: 1rem;
    }
    .free-hours-container{
        margin-bottom: 1rem;
        overflow-x: scroll;
        display: flex;
    }
    .hour{
        padding: 0.3rem 0.5rem;
        border: solid 1px var(--secondary-200);
        border-radius: var(--borderRadius);
        margin: 0.3rem 0.5rem;
    }
    .hour:hover{
        cursor: pointer;
    }
    .hour-checked{
        border: solid 2px var(--primary-500);
    }
    @media (min-width: 992px) {
        .add-service-container{
            width: 25%;
        }
    }

`
export default Wrapper