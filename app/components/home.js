import React, { Component } from 'react';
import 'static/css/common.css';
import analytics from 'helpers/analytics.js'
import Issues from 'components/issues'
class Home extends Component {
  constructor(props) {
        super(props);
        this.politicalData = this.props.politicalData;

        this.percentTotalDemocrats = this.politicalData.percentTotalDemocrats;
        this.percentEmployeeToDemocrats = this.politicalData.percentEmployeeToDemocrats;
        this.percentPacToDemocrats = this.politicalData.percentPacToDemocrats;

        this.pacTotalGiven = this.politicalData.pacTotalGiven;
        this.employeeTotalGiven = this.politicalData.employeeTotalGiven;
        this.totalGiven = this.politicalData.totalGiven;

        this.isOnlyOneAvailable = (this.pacTotalGiven && !this.employeeTotalGiven) || (!this.pacTotalGiven && this.employeeTotalGiven);

        this.statusMap = {
          YES:'good.svg',
          OK:'ok.svg',
          NO:'bad.svg'
      }
  }

  componentDidMount(){
      analytics.sendEvent( 'HomePageAppeared');
  } 
  render() {
    return (
		    <div className="progressiveshopper-app-container">
          <div className="progressiveshopper-item-summary">
            <div className="progressiveshopper-item-summary__header">
              <div className="progressiveshopper-image-badge">
                <img src={`${this.politicalData.logoUrl}`}/>
              </div>
              <div>
                <a><h2 className="progressiveshopper-item-summary__title">{this.politicalData.brandDomain}</h2></a>
              </div>
            </div>
          </div>
          {!!this.totalGiven && 
            <div>
              <div className="progressiveshopper-donation-distribution--bar">
                <div className="progressiveshopper-donation-distribution__heading">POLITICAL DONATIONS</div>
                <div className="progressiveshopper-donation-distribution__bar progressiveshopper-donation-distribution__bar-democrat">
                  <span className="progressiveshopper-donation-distribution__democrat" style={{width: `${this.percentTotalDemocrats}%`}}></span>
                  <span className="progressiveshopper-donation-distribution__label">{this.percentTotalDemocrats}% Democrat</span>
                </div>
                <p className="progressiveshopper-rating">
                  <span className="progressiveshopper-icon progressiveshopper-icon--large">
                    <img src={`static/images/${this.statusMap[this.politicalData.shopStatus]}`}/>             
                  </span> 
                  {this.politicalData.summaryHeadLine}
                </p>
              </div>
              
              <ul className={"progressiveshopper-grid-layout "+ (this.isOnlyOneAvailable ? 'donation-distribution-ul' : 'progressiveshopper-grid-layout--mobile-2col')}>
                {!!this.percentPacToDemocrats && 
                  <div className="progressiveshopper-donation-distribution--circular">
                    <div className="VictoryContainer" style={{width: '100%', height: '100%', pointerEvents: 'none', 'touchAction': 'none', position: 'relative'}}>
                      <img src="static/images/contribution-circle.svg" />     
                    </div>
                    <div className="progressiveshopper-donation-distribution__label">PAC Donations</div>
                    <div className="progressiveshopper-number-stat">
                      <div className="progressiveshopper-number-stat__label">Democrat</div>
                      <div className="progressiveshopper-number-stat__number-container">
                        <span className="progressiveshopper-number-stat__leading-units"></span>
                        <span className="progressiveshopper-number-stat__number">{this.percentPacToDemocrats}</span>
                        <span className="progressiveshopper-number-stat__trailing-units">%</span>
                      </div>
                    </div>
                  </div>
                }
              
                {!! this.percentEmployeeToDemocrats && 
                  <div className="progressiveshopper-donation-distribution--circular">
                    <div className="VictoryContainer" style={{width: '100%', height: '100%', pointerEvents: 'none', 'touchAction': 'none', position: 'relative'}}>
                      <img src="static/images/contribution-circle.svg" />     
                    </div>
                    <div className="progressiveshopper-donation-distribution__label">Employee Donations</div>
                    <div className="progressiveshopper-number-stat">
                      <div className="progressiveshopper-number-stat__label">Democrat</div>
                      <div className="progressiveshopper-number-stat__number-container">
                        <span className="progressiveshopper-number-stat__leading-units"></span>
                        <span className="progressiveshopper-number-stat__number">{this.percentEmployeeToDemocrats}</span>
                        <span className="progressiveshopper-number-stat__trailing-units">%</span>
                      </div>
                    </div>
                  </div>
                }
              </ul>
            </div>
          }
          {!this.totalGiven && 
            <div className="progressiveshopper-donation-distribution__label">No Data Available</div>
          }
          <div className="wp-block-buttons">
            <div className="wp-block-button is-style-primary" style = {{marginTop: '27px'}}>
              <a className="wp-block-button__link" href={`https://progressiveshopper.com/brand/#/${this.politicalData.brandDomain}`}>Learn More</a>
            </div>
				  </div>
        </div>
    );
  }
}

export default Home;
