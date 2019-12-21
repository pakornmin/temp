import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/ribbon.css';
import analytics from 'helpers/analytics.js'
class Ribbon extends Component {
  constructor(props) {
    super(props);
    this.bgColorStyle = {
      'NO': 'background-red',
      'YES': 'background-blue',
      'OK': 'background-purple'
    }
  }

  componentDidMount(){
      analytics.sendEvent( 'Ribbon Appeared');
      this.forceUpdate();
  }
  componentDidUpdate() {
    window.resizeIframeHeight(document.getElementsByTagName('html')[0].scrollHeight + "px");
  }

  onRibbonButtonClick  = ()=>{
    analytics.sendEvent('Ribbon Clicked');
    window.openIframePopup();
  }

  render() {
     const shopStatus = this.props.politicalData.shopStatus;
     const issueList = this.props.politicalData.issueList;
     const issueIcon = "https://ps-issues-icons.s3.us-east-2.amazonaws.com/click.svg";
      let text = '';
      if(shopStatus === 'NO'){
          text = 'Please Shop Elsewhere';
				}
				else if(shopStatus === 'OK'){
          text = 'An OK Option';
				}
				else if(shopStatus === 'YES') {
          text = 'Highly Recommended';
				}
    return (
       <div id="bookmark" onClick={this.onRibbonButtonClick}>
         
           <div>
             <div className="bookmark-logo"><img src="static/images/logo.png" /></div>
             <div className={`bookmark-text ${this.bgColorStyle[shopStatus]}` }><div><span>{text}</span></div></div>
            </div>
           {(issueList && issueList.length > 0) &&
                <div className="bookmark-issues">
                      <ul>
                          {issueList.map((issue, i) => (
                              <li className="issue-text" ><img src={issue.iconLink ? issue.iconLink: issueIcon}></img>{issue.text}</li>
                          ))}
                      </ul>
                </div>
             
        }
      </div>
    );
  }
}

export default Ribbon;
