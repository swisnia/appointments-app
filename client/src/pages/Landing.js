import React from 'react'
import main from '../assets/images/register-firm.png'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <main>
            <nav>
               <Logo/>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        Aplikacja dla <span>salonów fryzjerskich</span>
                    </h1>
                    <p>
                        I'm baby slow-carb beard post-ironic church-key gastropub gentrify prism banjo jianbing shoreditch kogi venmo narwhal organic leggings. Gochujang snackwave woke beard praxis health goth master cleanse neutra plaid. Forage 3 wolf moon kitsch microdosing photo booth deep v seitan disrupt actually fanny pack cold-pressed organic cronut locavore succulents. Keffiyeh poutine wolf, try-hard godard prism seitan cliche 8-bit taxidermy. Gastropub vape hella, flannel post-ironic hammock typewriter locavore twee pour-over cray hoodie fixie subway tile salvia. Hoodie swag YOLO pickled. 
                    </p>
                    <Link to='/register' className='btn btn-link'>
                        Logowanie/Rejestracja
                    </Link>
                </div>
                <img src={main} alt='job hount' className='img main-img'/>
            </div>
        </main>
    </Wrapper>
    )
}

export default Landing