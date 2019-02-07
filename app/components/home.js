import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/home.css';
import analytics from 'helpers/analytics.js'
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

        this.statusMap = {
          YES:'good.png',
          OK:'ok.png',
          NO:'bad.png'
      }
  }

  componentDidMount(){
      analytics.sendEvent( 'HomePageAppeared');
  } 
  render() {
    return (
      <div>
        <section id="brand">
          <p>{this.politicalData.brandDomain}</p>
          <div className="company-info">
            <div className="status">
              <img src={`static/images/${this.statusMap[this.politicalData.shopStatus]}`} alt="" id="status-img"/>
              <p>{this.politicalData.summaryHeadLine}</p>
            </div>

            <div className="company-logo">
              <div className="logo-box">
                <img src={`${this.politicalData.logoUrl}`}/>
              </div>
            </div>
          </div>

          <div id="contributions">
            <p>% Overall Contributions to Democrats</p>
            {this.totalGiven !== 0 &&
              <ul id="political">
                <li>{this.percentTotalDemocrats}%</li>
                <li>{100-this.percentTotalDemocrats}%</li>
              </ul>
            }
            {this.totalGiven === 0 && <div>No DATA</div> }

            <p>% PAC Contributions to Democrats</p>
            {this.pacTotalGiven !== 0 &&
              <ul id="pac">
                <li>{this.percentPacToDemocrats}%</li>
                <li>{100-this.percentPacToDemocrats}%</li>
              </ul>
            }
            {this.pacTotalGiven === 0 && <div>NO PAC</div> }  

            <p>% Employee Contributions to Democrats</p>
            {this.employeeTotalGiven !== 0 && 
              <ul id="employee">
                <li>{this.percentEmployeeToDemocrats}%</li>
                <li>{100-this.percentEmployeeToDemocrats}%</li>
              </ul>
            }
            {this.employeeTotalGiven === 0 && <div>No EMPLOYEE</div> }  
          </div>
          <div class="foxSection">
            <img src="./static/images/warn.png" alt=""/>
            <p>Fox News Sponsor</p>
          </div>
        </section>
     </div>
    );
  }
}

export default Home;
