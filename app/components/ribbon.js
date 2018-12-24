import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/ribbon.css';
import analytics from 'helpers/analytics.js'
class Ribbon extends Component {
  constructor(props) {
        super(props);
  }

  componentDidMount(){
      analytics.sendEvent( 'Ribbon Appeared');
  }

  onRibbonButtonClick  = ()=>{
    analytics.sendEvent('Ribbon Clicked');
    window.openIframePopup();
  }

  render() {
     const shopStatus = this.props.politicalData.shopStatus;
      let iconPath = '';
      if(shopStatus === 'NO'){
					iconPath = "static/images/logo-bad.png";
				}
				else if(shopStatus === 'OK'){
					iconPath = "static/images/logo-ok.png";
				}
				else if(shopStatus === 'YES') {
					iconPath = "static/images/logo-good.png";
				}
    return (
       <div id="bookmark" onClick={this.onRibbonButtonClick}>
          <img src={iconPath} />
          
       </div>
    );
  }
}

export default Ribbon;
