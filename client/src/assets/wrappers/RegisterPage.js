import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  justify-content: space-evenly;
  
  .background{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
  }
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border: solid 1px var(--secondary-300);
  }

  h3 {
    text-align: center;
  }
  h4 {
    text-align: center;
  }
  h6{
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  header{
    color: var(--secondary-500);
    background-color: var(--background-bright);
    height: 1.5rem;
    padding: 0 0.75rem;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-600);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .form-container{
    display: flex;
    width: 100%;
  }
  .info-container{
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end; 
    margin-right: 3rem;
  }
  .register-img{
    max-width: 400px;
  }
  .btn-container{
    display: flex;
    gap: 1rem;
  }
  .register-container{
    display: flex;
    border: solid 1px var(--secondary-300);
    background: rgba(255, 255, 255, 0.48);
    width: 100%;
    min-height: 42rem;
  }
  .sidebar-container{
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 1.5rem;
    min-height: 100%;
    width: 15vw;
    border-right: 1px solid var(--secondary-300);
  }
  .sidebar-container h5{
    display: flex;
    align-items: center;
    margin: 0;
    padding: 1.5rem 0.75rem;
    border-bottom: 1px solid var(--secondary-300);
  }
  .sidebar-container svg{
    margin-right: 0.75rem;
  }
  .reg-img{
    color: var(--green-dark);
  }

  .inputs-container{
    width: 35vw;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .day-container{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .day-container h5{
    margin: 0;
    margin-left: 1rem;
  }
  .map-container{
    height: 200px;
  }
  .add-worker-container{
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    column-gap: 1rem;
  }
  .worker-container{
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0.75rem 0;
  }
  .worker-container h5{
    margin: 0;
  }
  .info-txt{
    text-align: center;
    margin: 0;
    padding: 0.75rem;
  }
  .workers-header{
    display: flex;
    justify-content: space-between;
  }
  .services-header{
    display: grid;
    grid-template-columns: 1fr 0.75fr 0.3fr 0.3fr;
  }
  .service-container{
    display: grid;
    grid-template-columns: 1fr 0.75fr 0.3fr 0.3fr;
    padding: 0.75rem 0.75rem 0;
  }
  .picture-container{
    max-width: 100%;
    height: 25rem;
    position: relative;
  }
  .picture-container img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .img-invisible{
    display: none;
  }
  .img-visible{
    display: block;
  }
  #addSalonImg{
    display: none;
  }
  .switch-img-btn-container{
    width: 100%;
    z-index: 2;
    position: absolute;
    top: calc(50% - 2rem);
    display: flex;
    justify-content: space-between;
  }
  .switch-img-btn{
    height: 4rem;
    width: 4rem;
  }
  .switch-img-btn:hover{
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.48);
  }
  @media (min-width: 992px) {
    .street-and-number{
      display: grid;
      grid-template-columns: 4fr 1fr;
      column-gap: 0.5rem;
    }
    .postal-code-and-city{
      display: grid;
      grid-template-columns: 1fr 3fr;
      column-gap: 0.5rem;
    }
  }
`
export default Wrapper
