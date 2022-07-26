import React, { Component } from 'react';
import 'static/css/common.css';
import analytics from 'helpers/analytics.js'
import Accordion from './Accordion';
import TotalContributon from './TotalContribution';
import Accordion2 from './Accordion2';

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
          <div className='home'>
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
            <div className='home-detail'>
              {!!this.totalGiven && 
                <div>
                  <TotalContributon 
                    politicalData={this.politicalData} 
                    statusMap={this.statusMap}
                    isOnlyOneAvailable={this.isOnlyOneAvailable}
                    percentPacToDemocrats={this.percentPacToDemocrats}
                    percentEmployeeToDemocrats={this.percentEmployeeToDemocrats}/>            
                <Accordion2 
                    politicalData={this.politicalData} 
                    statusMap={this.statusMap}
                    isOnlyOneAvailable={this.isOnlyOneAvailable}
                    percentPacToDemocrats={this.percentPacToDemocrats}
                    percentEmployeeToDemocrats={this.percentEmployeeToDemocrats}/>
                </div>
         
              }
              {!this.totalGiven && 
                <div className="progressiveshopper-donation-distribution__label">No Data Available</div>
              }
              { this.politicalData.issueList && <Accordion
                issues={this.props.issues} 
                politicalData={this.politicalData}
              />
              }
            </div>
            
          </div>
          <div className="wp-block-buttons">
              <div className="wp-block-button is-style-primary" style = {{marginTop: '5px'}}>
                <a className="wp-block-button__link" href={`https://progressiveshopper.com/brand/#/${this.politicalData.brandDomain}`}>Learn More</a>
              </div>
            </div>
        </div>
    );
  }
}

export default Home;
