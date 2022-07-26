import React, { Component } from 'react';
import 'static/css/common.css';
import analytics from 'helpers/analytics.js'

class Header extends Component {
  constructor(props) {
        super(props);
  }
  onSettingsClick = ()=>{
    analytics.sendEvent('SettingButtonClicked');
    this.props.showSetting();
  }

  onCloseButtonClick  = ()=>{
      analytics.sendEvent('PopupCloseClicked');
      //console.log('Close clicked');
      window.closeIframeWindow(this.props);
  }

  render() {
    return (
      <div>
          <header>
            <div className="logo">
              <img src="static/images/logo.svg" alt=""/>
            </div>

            <div className="close" onClick={this.onCloseButtonClick}>
              <img src="static/images/close.png" alt="Close"  title="Close"/>
            </div> 
          </header>
    </div>  
    );
  }
}
export default Header;
