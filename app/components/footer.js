import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/nav.css';
import analytics from 'helpers/analytics.js'

class Footer extends Component {
  constructor(props) {
    super(props);
    
  }
  onHomeClick = ()=>{
    analytics.sendEvent('HomeTabClicked');
    this.props.showHome();
  }
  onActionClick = ()=>{
    analytics.sendEvent('ActionTabClicked');
    this.props.showAction();
  }
  onSimilarStoryClick = ()=>{
    analytics.sendEvent('SimilarStoreTabClicked');
    this.props.showSimilarStory();
  }
  
  render() {
    const brandImage = this.props.home ? 'static/images/brands-selected.png':'static/images/brands.png';
    const compImage = this.props.similarStory ? 'static/images/competitors-selected.png':'static/images/competitors.png';
    const actionImage = this.props.action ? 'static/images/actions-selected.png' : 'static/images/actions.png';
    return (
      <footer>
        <div id="brand-btn" onClick={this.onHomeClick} className={"nav-item "+ (this.props.home ? 'selected' : '')}>
          <img src={brandImage} alt="" id="imgBrand"/>
          <p>Brand</p>
        </div>
        <div id="competitors-btn"  onClick={this.onSimilarStoryClick} className={"nav-item "+ (this.props.similarStory ? 'selected' : '')}>
          <img src={compImage} alt="" id="imgComp"/>
          <p>Competitors</p>
        </div>
        <div id="actions-btn" onClick={this.onActionClick} className={"nav-item "+ (this.props.action ? 'selected' : '')}>
          <img src={actionImage} alt="" id="imgAct"/>
          <p>Action</p>
        </div>
      </footer>
    );
  }
}
export default Footer;
