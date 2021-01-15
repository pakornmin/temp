import React, { Component } from 'react';
import '../../app/static/css/common.css';
import analytics from 'helpers/analytics.js'
class Action extends Component {
  onActionClick(link,label) {
      analytics.sendEvent('Action-'+label+'-Clicked');
      window.openLinkNewTab(link);
  }
  componentDidMount(){
      analytics.sendEvent( 'ActionPageAppeared');
      window.setLastShownTimeActions();
  }
  render() {
    return (
      <div className = "action-section">
        <div className = "actions">
          {this.props.actionList.map((action, i) => (
            <div className="wp-block-column action-block" onClick={() => this.onActionClick(action.link,action.label)} key={i}>
              <div className="wp-block-group alignwide progressiveshopper-actions">
                <div className="wp-block-group__inner-container">
                    <figure className="wp-block-image size-large progressiveshopper-image-badge is-style-badge">
                      <img className="action-icon" src={action.imageUrl} alt=""/>
                    </figure>
                    <h2>{action.label}</h2>
                    <p>{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="wp-block-buttons">
          <div className="wp-block-button is-style-primary">
              <a className="wp-block-button__link" href="https://progressiveshopper.com/actions/">Learn More</a>
          </div>
			  </div>
    </div>
      
    );
  }
}
export default Action;
