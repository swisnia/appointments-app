import styled from 'styled-components'

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .test{
    position: fixed;
    bottom: 0;
    width: 100vc;
  }
  z-index: 99;
  .bottombar-container {
    position: fixed;
    bottom: 0;
    background: var(--secondary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  } 
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    display: flex;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--white);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin:0 1rem 0 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    border-top: 5px solid var(--primary-500);
  }
  .active .icon {
    color: var(--primary-500);
  }
`
export default Wrapper
