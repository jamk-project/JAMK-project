import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import HamburgerMenu from 'react-hamburger-menu';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			open:  [false, true, false, true]
		};
  }
	handleClick(id) {
		let { open } = this.state;
    this.setState({
			open: [...open.slice(0, id), !open[id], ...open.slice(id + 1)]
		});
	}
	render() {

  return (
    <div className="App">
      <div className="App-header">
        <div className="Header-container">
          <div className="Logo">
            <img src="/img/cropped-BisLenzLogoWhite.png" height="60px" alt="Bislenz logo"/>
          </div>
          <div className="Nav">
            <a className="padding" href="#">CUSTOMER JOURNEY</a>
            <a className="padding" href="#">VOICE OF CUSTOMER</a>
            <a className="padding" href="#">MARKETING PERFORMANCE</a>
            <img className="padding userLogo" src="/img/profile.webp" height="20px" alt="User logo"/>
            <a href="#"> DILEMMA</a>
          </div>
          <div className="Nav2 dropdown">
            <div className="dropdown-content">
              <a className="padding" href="#">CUSTOMER JOURNEY</a>
              <a className="padding" href="#">VOICE OF CUSTOMER</a>
              <a className="padding" href="#">MARKETING PERFORMANCE</a>
              <a  href="#"><img src="/img/profile.webp" height="20px" alt="User logo"/> DILEMMA</a>
            </div>
            <div className="dropbtn">
            <HamburgerMenu
                isOpen={this.state.open[0]}
                menuClicked={this.handleClick.bind(this, 0)}
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
      </div>
      <div className="content">
        
      </div>
      <footer>
        <p>Tridea 2020</p>
        <button onClick="topFunction()" id="myBtn" title="Go to top">^</button>
      </footer>
     {/*  {props.nimi === "Dima" ? dima : 
      jouni} */}

{/*     may
be?! pitää toteuttaa fetch method joka tekee request ja saa json googlesta => json => react renderoi json (result.map(() => <div>result.age <p>result.gender</p></div>)
 */}
    </div>


  ); 
};
}

ReactDOM.render(<App />, document.getElementById('root'));
