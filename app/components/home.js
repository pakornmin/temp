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
        this.brandDomain = this.props.brandDomain;
        this.name = this.props.name; 
        this.iconPath = 'https://ps-logos.s3.us-east-2.amazonaws.com/' + this.props.iconPath;
        this.shopStatus = this.props.shopStatus;

        this.percentTotalDemocrats = this.politicalData.percentTotalDemocrats;
        this.percentEmployeeToDemocrats = this.politicalData.percentEmployeeToDemocrats;
        this.percentPACToDemocrats = this.politicalData.percentPACToDemocrats;

        this.pacTotalGiven = this.politicalData.totalPAC;
        this.employeeTotalGiven = this.politicalData.totalEmployee;
        this.totalGiven = this.politicalData.total;

        this.isOnlyOneAvailable = (this.pacTotalGiven == this.totalGiven) || (this.employeeTotalGiven == this.totalGiven);
        //console.log('only one available: ', this.isOnlyOneAvailable);

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
                  <img src={`${this.iconPath}`}/>
                </div>
                <div>
                  <a><h2 className="progressiveshopper-item-summary__title">{this.name}</h2></a>
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
                    shopStatus={this.shopStatus}
                    isOnlyOneAvailable={this.isOnlyOneAvailable}
                    percentPACToDemocrats={this.percentPACToDemocrats}
                    percentEmployeeToDemocrats={this.percentEmployeeToDemocrats}/>
                </div>
         
              }
              {!this.totalGiven && 
                <div className="progressiveshopper-donation-distribution__label">No Data Available</div>
              }
              { this.props.issueList && <Accordion
                name={this.props.name}
                brandDomain = {this.brandDomain}
                issueList={this.props.issueList} 
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
