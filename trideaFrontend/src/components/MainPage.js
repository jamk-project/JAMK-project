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
import LoginPage from './LoginPage'

const MainPage = () => {
  const auth = new Auth();
  // console.log(auth)

  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);

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
      <NavLink to='/journey' className='padding' activeStyle={activeStyle}>CUSTOMER JOURNEY</NavLink>
      <NavLink to='/voice' className='padding' activeStyle={activeStyle}>VOICE OF CUSTOMER</NavLink>
      <NavLink to='/marketing' className='padding' activeStyle={activeStyle}>MARKETING PERFORMANCE</NavLink>
    </>
  )

  const dropdown = (<div className='Nav2 dropdown'>
    <div className='dropdown-content'>
      {returnLinks}
      <NavLink to='/home'><img src='/img/profile.webp' height='20px' alt='User logo' />DILEMMA</NavLink>
    </div>
  </div>)

  const name = ['home', 'journey', 'voice', 'marketing'];

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
                <img className='padding userLogo' src='/img/profile.webp' height='20px' alt='User logo' />
                <NavLink to='#' onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                  DILEMMA  <span> </span>
                  {isShown && <NavLink to='#' onClick={handleLogout}>Logout</NavLink>}
                </NavLink>
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
              <Route exact path='/' component={LoginPage} />
              <Route path='/home' render={(props) => (
                <CustomPage {...props} data={name[0]} />
              )} />
              <Route path='/journey' render={(props) => (
                <CustomPage {...props} data={name[1]} />
              )} />
              <Route path='/voice' render={(props) => (
                <CustomPage {...props} data={name[2]} />
              )} />
              <Route path='/marketing' render={(props) => (
                <CustomPage {...props} data={name[3]} />
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
