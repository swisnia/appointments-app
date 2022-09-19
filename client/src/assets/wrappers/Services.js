import styled from 'styled-components'

const Wrapper = styled.section`
    background-color: var(--white);
    /*height: 83vh;*/
    header{
        background-color: var(--background-bright);
    }
    h4{
        margin: 0;
        padding: 1rem 0;
        text-align: center;
    }
    .services-container{

    }
    .info-txt{
        text-align: center;
        padding: 1rem 0;
    }
    .category-name h4{
        padding: 0;
        text-align: left;
    }
    .category-name{
        padding: 0 1rem 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .icon-down{
        width: 2rem;
    }
    .btn-container{
        padding: 1rem;
        display: grid;
        row-gap: 1rem;
    }
    .add-service-window{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: var(--backgroundShadow);
        height: var(--full-page);
        width: 100vw;
    }
    @media (min-width: 992px) {
        .btn-container{
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
    }
`
export default Wrapper