import React from 'react';

import '../App.css';

const LoginPage = () => (
  <div className='App'>
    <div className='App-header'>
      <div className='Header-container'>
        <div className='Logo'><img src='/img/cropped-BisLenzLogoWhite.png' height='60px' alt='Bislenz logo' /></div>
        <div className='LikeNav'>
          <a href='/home' className='Login'>
            Login
            </a>
        </div>
      </div>
    </div>
    <div className='content'>
      Login Page
        </div>
    <footer>
      <p>Tridea 2020</p>
      <button onClick={() => console.log('Footer button clicked')} id='myBtn' title='Go to top'>^</button>
    </footer>
  </div>
);

export default LoginPage;
