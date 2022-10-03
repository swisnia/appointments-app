import styled from "styled-components";

const Wrapper = styled.section `
    padding: 0.35rem 0.75rem;
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 1px solid var(--secondary-200);
    align-items: center;
    :hover{
        cursor: pointer;
        background-color: var(--backgroundColor);
    }
    h6 {
        font-weight: bold; 
    }
    .avatar-img{
        height: 4rem;
        width: 4rem;
        border-radius: 2rem;
        object-fit: cover;
    }
    .avatar-info{
        padding-left: 0.75rem;
    }
    @media (max-width: 1249px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    @media (min-width: 1250px) {
        grid-template-columns: 0.3fr 1fr;
    }
`
export default Wrapper