import styled from 'styled-components'

const Wrapper = styled.section`
  /*.dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {*/
  
  .dashboard {
    display: grid;
    grid-template-columns: auto 1fr;
    padding-bottom: 3rem;
  }
  .dashboard-page {
      width: 90%;
      height: 85%;
      margin: 2rem auto;
      background-color: var(--white);
     /* border: 1px solid var(--secondary-300);*/
      border-radius: var(--boxRadius);
    }
    @media (min-width: 992px) {
      .dashboard {
        background-color: var(--backgroundColor);
        padding-bottom: 0;
      }
      .dashboard-page-container{
        max-height: 100vh;
      }
    }
  /*}*/
`
export default Wrapper
