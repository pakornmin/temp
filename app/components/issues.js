import React, { Component, Fragment } from 'react';
import 'static/css/common.css';

class Issues extends Component {  
  constructor(props) {
        super(props);
        //this.state = {
        //    open: false
        //};
  }

  parseName(name) {
      let result = name.toLowerCase();
      result = result.replace('/', '');
      result = result.replace(/\s/g, '-');
      
    
      return result + '.svg';
  }

  onIssueBoxClick = ()=>{
     this.setState({open: !this.state.open})
  }
  
  render() {
    const issueList = this.props.issueList;
    const brandDomain = this.props.brandDomain;
    if(!issueList || issueList.length == 0) {
        return (<section>
            <div className='issue'> 
                <div className='issues-heading'>
                    <h2 className="progressiveshopper-item-summary__title">No Available Information</h2>
                </div>
                <div className="issues-list">
                </div>
                
                    
                <div className="wp-block-buttons">
                    <div className="wp-block-button is-style-primary">
                        <a className="wp-block-button__link" href={`https://progressiveshopper.com/brand/#/${brandDomain}`}>Learn More</a>
                    </div>
                </div>
            </div>
        </section>);
    }
    return (
        <Fragment>
                <ul>
                    {issueList.map((issue, i) => (
                        <Fragment key={i}>
                            <li className="progressiveshopper-rating-list">
                                <p className="progressiveshopper-rating">
                                    <span className="progressiveshopper-icon progressiveshopper-icon--very-large">
                                        <img src={`static/images/${this.parseName(issue.text)}`} />              
                                    </span> 
                                    <span className="progressiveshopper-issue-rating-text">
                                        {issue.text}
                                    </span>
                                </p>
                            </li>
                        </Fragment>
                    ))} 
                </ul>
            
            
        </Fragment>
    );

  }
}

export default Issues;
