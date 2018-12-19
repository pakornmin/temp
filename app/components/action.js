import React, { Component } from 'react';
import '../../app/static/css/common.css';
import '../../app/static/css/actions.css';
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
      <section id="actions">
        {this.props.actionList.map((action, i) => (
          <a href="#" onClick={() => this.onActionClick(action.link,action.label)} key={i} >
            <div className="icon"><img className="action-icon" src={action.imageUrl} alt=""/></div>
            <div className="details">
              <div className="title">{action.label}</div>
              <p>{action.description}</p>
            </div>
          </a>
        ))}
    </section>
    );
  }
}
export default Action;
