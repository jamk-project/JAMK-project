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
    color: 'dodgeblue',
  }

  const returnLinks = (
    <>
      <li className="dropdown1">
      <NavLink to='/journey' className='padding' activeStyle={activeStyle}>CUSTOMER JOURNEY</NavLink>
                <ul className="drop1">
                  <li><NavLink to="/">Brand Reach</NavLink></li>
                  <li><NavLink to="/">Website Visitors</NavLink></li>
                  <li><NavLink to="/">Conversion</NavLink></li>
                  <li><NavLink to="/">Sales</NavLink></li>
                  <li><NavLink to="/">Google My Business</NavLink></li>
                </ul>
      </li>
      <li className="dropdown2">
      <NavLink to='/voice' className='padding' activeStyle={activeStyle}>VOICE OF CUSTOMER</NavLink>
                <ul className="drop2">
                  <li><NavLink to="/">Voice of Customer</NavLink></li>
                  <li><NavLink to="/">Online Experience</NavLink></li>
                  <li><NavLink to="/">Onsite Experience</NavLink></li>
                  <li><NavLink to="/">Customer Service and Sales Experience</NavLink></li>
                  <li><NavLink to="/">Social Voice</NavLink></li>
                  <li><NavLink to="/">Survey Management</NavLink></li>
                </ul>
      </li>
     <li className="dropdown3">
      <NavLink to='/marketing' className='padding' activeStyle={activeStyle}>MARKETING PERFORMANCE</NavLink>
                <ul className="drop3">
                  <li><NavLink to="/">Online Marketing Summary</NavLink></li>
                  <li><NavLink to="/">Campaign Details</NavLink></li>
                  <li><NavLink to="/">Online Campaign Timeline</NavLink></li>
                  <li><NavLink to="/">Social Media organic Timeline</NavLink></li>
                  <li><NavLink to="/">Social Media Engagement</NavLink></li>
                  <li><NavLink to="/">Online Campaign Comparison</NavLink></li>
                </ul>
      </li>
    
    </>
  )

  const company = auth.currentUser();

  const handleLogout = () => auth.logout()

  const dropdown = (
    <div className='Nav2 dropdown'>
      <div className='dropdown-content'>
        {returnLinks}
        <NavLink to='/home' onClick={handleLogout}><img src='/img/profile.webp' height='30px' alt='User logo' /><span> </span>{company.name}</NavLink>
        <NavLink className='user logoutMobile' to='#' onClick={handleLogout}>Logout</NavLink>
      </div>
    </div>
  )

  const pageName = ['home', 'journey', 'voice', 'marketing'];


  if (auth.isLoggedIn()) {
    // console.log(auth.currentUser());

    return (
      <Router>
        <div className='App'>
          <div className='App-header'>
            <div className='Header-container'>
              <NavLink to='/home' className='Logo'><img src='/img/cropped-BisLenzLogoWhite.png' height='60px' alt='Bislenz logo' /></NavLink>
              <ul className="Nav">
                {returnLinks}
                
              </ul>
              <div className='username userLogo'>
                <img  src='/img/profile.webp' height='50px' alt='User logo' />
                <br></br>
                <ul>
                  <li className="compName">{company.name}</li>
                  <NavLink className='user' to='#' onClick={handleLogout}>Logout</NavLink>
                </ul>
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
          </footer>
        </div>
      </Router>
    );
  };
}

export default MainPage;
