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
     const issueLength = this.props.politicalData.issueList ? this.props.politicalData.issueList.length : 0;
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
         { issueLength == 0 && 
          <div class="no-issue-ribbon">
            <img src={iconPath} /> 
          </div>
         }
        
         {issueLength > 0 &&
          <div className = "issue-ribbon">
            <div>
              <img src={iconPath} /> 
            </div>
            <div className="issue-container">
              <div className="issues">
                  <div className="numberCircle">
                    <p className="font11">{issueLength}</p> 
                  </div>
                  <p className="font11"> {issueLength == 1 ? 'Serious Issue' : 'Serious Issues'}</p>
              </div>
            </div>
          </div>
         }
         
      </div>
    );
  }
}

export default Ribbon;
