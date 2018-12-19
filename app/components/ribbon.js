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
					iconPath = "static/images/bookmark-red.png";
				}
				else if(shopStatus === 'OK'){
					iconPath = "static/images/bookmark-purple.png";
				}
				else if(shopStatus === 'YES') {
					iconPath = "static/images/bookmark-blue.png";
				}
    return (
       <div id="bookmark" onClick={this.onRibbonButtonClick}>
          <img src={iconPath} />
          
       </div>
    );
  }
}

export default Ribbon;
