import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--secondary-600);
  background: var(--white);
  z-index: 99;
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  h4{
    margin: 0;
    color: var(--white);
  }
  h6{
    color: var(--white);
    padding-right: 1rem;
  }
  .nav-center {
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--secondary-600);
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 5%;
  }
  .btn-container {
    height: var(--nav-height);
    background-color: var(--secondary-600);
    border-bottom-left-radius: calc(0.5 * var(--nav-height));
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
  }
  .user-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.2rem;
    padding: 0 0.5rem 0 1rem;
    color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 100%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`
export default Wrapper
