import React, { Component } from 'react'

export class Nav extends Component {
  render() {
    return (
        <header>
        <div className="center">
          <a href="/"><img src="images/chat-banner.png" style={{"padding":0,"margin":0,"width":"100%"}} className="img-responsive" alt="tripsit banner"/></a>
        </div>
        <nav role="navigation" style={{"padding":0,"margin":0}} className="navbar navbar-inverse navbar-static-top">
          <div className="container-fluid">
          <div>
            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
          </div>
  
            <div className="collapse navbar-collapse" id="bs-navbar-collapse">
              <ul style={{"padding":0,"margin":0}} className="nav navbar-nav navbar-right top-nav">
                <li className="choice"><a href="http://tripsit.me/about">About</a></li>
                <li className="choice"><a href="http://tripsit.me/contact-us">Contact Us</a></li>
                <li className="choice"><a href="http://drugs.tripsit.me/">Factsheets</a></li>
                <li className="choice"><a href="http://wiki.tripsit.me/">Wiki</a></li>
                <li className="choice"><a href="https://play.google.com/store/apps/details?id=me.tripsit.tripmobile">Mobile App</a></li>
                <li className="choice"><a href="http://chat.tripsit.me/">Chat</a></li>
                <li className="choice dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li className="choice"><a href="http://benzos.tripsit.me/">Benzodiazepine Converter</a></li>
                    <li className="choice"><a href="http://dxm.tripsit.me/">DXM Calculator</a></li>
                    <li className="choice"><a href="http://volume.tripsit.me/">Volumetric Dosing</a></li>
                  </ul>
                </li>
                <li className="choice dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Social Media<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li className="choice"><a href="https://www.facebook.com/tripsitme/">Facebook</a></li>
                    <li className="choice"><a href="http://reddit.com/r/tripsit/">Reddit</a></li>
                    <li className="choice"><a href="https://twitter.com/teamtripsit">Twitter</a></li>
                  </ul>
                </li>
                <li className="choice"><a href="http://tripsit.me/donate/">Donate</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Nav
