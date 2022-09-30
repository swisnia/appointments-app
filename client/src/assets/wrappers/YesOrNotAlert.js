import styled from "styled-components";

const Wrapper = styled.section `
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #42424209;
    display: flex;
    align-items: center;
    justify-content: center;
    .alert-container{
        padding: 1.5rem;
        background-color: var(--white);
        border-radius: var(--borderRadius);
        text-align: center;
        max-width: 400px;
    }
    .btn-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 1.5rem;
        margin-bottom: 0;
    }
    .btn{
        min-width: 120px;
    }
    .btn-no{
        width: 100%;
        background-color: red;
    }
    .btn-yes{
        width: 100%;
        margin-right: 1rem;
        background-color: green;
    }
`
export default Wrapper