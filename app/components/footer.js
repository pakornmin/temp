import React, { Component } from 'react';
import 'static/css/common.css';
import analytics from 'helpers/analytics.js'

class Footer extends Component {
  constructor(props) {
    super(props);
    
  }
  onHomeClick = (e)=>{
    analytics.sendEvent('HomeTabClicked');
    this.props.showHome();
    e.preventDefault();
  }
  onActionClick = (e)=>{
    analytics.sendEvent('ActionTabClicked');
    this.props.showAction();
    e.preventDefault();
  }
  onSimilarStoryClick = (e)=>{
    analytics.sendEvent('SimilarStoreTabClicked');
    this.props.showSimilarStory();
    e.preventDefault();
  }
  
  render() {
   
    return (
      <div className="header-navigation-wrapper">
        <nav className="expanded-menu-wrapper" aria-label="Horizontal" role="navigation">
            <ul className="expanded-menu">
              <li onClick={this.onHomeClick} id="menu-item-631"  className={"menu-item "+ (this.props.home ? 'current-menu-item' : '')}><a href="#" aria-current="page">BRAND</a></li>
              <li onClick={this.onSimilarStoryClick} id="menu-item-488"  className={"menu-item "+ (this.props.similarStory ? 'current-menu-item' : '')}><a href="#">ALTERNATES</a></li>
              <li onClick={this.onActionClick} id="menu-item-490"  className={"menu-item "+ (this.props.action ? 'current-menu-item' : '')}><a href="#">WHAT YOU CAN DO</a></li>
            </ul>
        </nav>
    </div>
    );
  }
}
export default Footer;
