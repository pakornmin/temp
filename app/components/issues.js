import React, { Component, Fragment } from 'react';
import 'static/css/issues.css';
import analytics from 'helpers/analytics.js'
import { isNullOrUndefined } from 'util';
class Issues extends Component {
  constructor(props) {
        super(props);
        this.state = {
            open: false
        };
  }

  onIssueBoxClick = ()=>{
     this.setState({open: !this.state.open})
  }
  
  render() {
    const issueList = this.props.issueList;
    if(!issueList || issueList.length == 0) {
        return null;
    }
    return (
        <div className="issue-container">
            <div className="issues" onClick={this.onIssueBoxClick}>
                <div className="numberCircle"> {issueList.length}</div> <div><p> {issueList.length == 1 ? 'SERIOUS ISSUE' : 'SERIOUS ISSUES'}</p></div>
            </div>
            
            {this.state.open && 
                <div className="issueList">
                    <ul>
                        {issueList.map((issue, i) => (
                            <li key={i}>{issue.text}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
  }
}

export default Issues;
