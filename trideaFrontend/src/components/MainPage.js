import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';

import '../App.css';
import Auth from './Auth';
import CustomPage from './CustomPage'

const MainPage = () => {
  const auth = new Auth();
  // console.log(auth)

  const [isOpen, setIsOpen] = useState(false);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    // console.log(dimensions);

    const handleResize = () => {
      setIsOpen(false);
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  });

  const handleClick = () => setIsOpen(!isOpen);

  const activeStyle = {
    textDecoration: 'underline',
  }

  const returnLinks = (
    <>

      <div><NavLink to='/journey' className='padding' activeStyle={activeStyle}>CUSTOMER JOURNEY</NavLink></div>
      <div><NavLink to='/voice' className='padding' activeStyle={activeStyle}>VOICE OF CUSTOMER</NavLink></div>
      <div><NavLink to='/marketing' className='padding' activeStyle={activeStyle}>MARKETING PERFORMANCE</NavLink></div>
    </>
  )

  const company = auth.currentUser();

  const dropdown = (
    <div className='Nav2 dropdown'>
      <div className='dropdown-content'>
        {returnLinks}
        <NavLink to='/home'><img src='/img/profile.webp' height='20px' alt='User logo' />{company.name}</NavLink>
      </div>
    </div>
  )

  const pageName = ['home', 'journey', 'voice', 'marketing'];

  const handleLogout = () => auth.logout()

  if (auth.isLoggedIn()) {
    // console.log(auth.currentUser());

    return (
      <Router>
        <div className='App'>
          <div className='App-header'>
            <div className='Header-container'>
              <NavLink to='/home' className='Logo'><img src='/img/cropped-BisLenzLogoWhite.png' height='60px' alt='Bislenz logo' /></NavLink>
              <div className='Nav'>
                {returnLinks}
                <div className='padding username'>
                <img className='userLogo' src='/img/profile.webp' height='20px' alt='User logo' />
                {company.name}
                <NavLink className='user' to='#' onClick={handleLogout}>Logout</NavLink>
                </div>
              </div>
              {isOpen && window.innerWidth <= 1000 ? dropdown : null}
              <div className='dropbtn'>
                <HamburgerMenu
                  isOpen={isOpen}
                  menuClicked={handleClick}
                  width={30}
                  height={25}
                  strokeWidth={3}
                  rotate={0}
                  color='white'
                  borderRadius={0}
                  animationDuration={0.5}
                />
              </div>
            </div>
          </div>
          <div className='content'>
            <Switch>
              <Route path='/home' render={(props) => (
                <CustomPage {...props} pageName={pageName[0]} company={company} />
              )} />
              <Route path='/journey' render={(props) => (
                <CustomPage {...props} pageName={pageName[1]} company={company} />
              )} />
              <Route path='/voice' render={(props) => (
                <CustomPage {...props} pageName={pageName[2]} company={company} />
              )} />
              <Route path='/marketing' render={(props) => (
                <CustomPage {...props} pageName={pageName[3]} company={company} />
              )} />
            </Switch>
          </div>
          <footer>
            <p>Tridea 2020</p>
            <button onClick={() => console.log('Footer button clicked')} id='myBtn' title='Go to top'>^</button>
          </footer>
        </div>
      </Router>
    );
  };
}

export default MainPage;
