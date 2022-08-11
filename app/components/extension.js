import React, { Component } from 'react';
import Popup from 'components/popup';
import Slider from 'components/Slider';
import Ribbon from 'components/ribbon';
import 'static/css/common.css';

class Extension extends Component {
  constructor(props) {
    super(props);
    this.politicalData = this.props.data ? this.props.data.politicalData : null;
    if(this.politicalData){
        if(this.politicalData.total != 0) {
          this.politicalData.percentTotalDemocrats = parseInt(this.politicalData.totalDemocrat/this.politicalData.total * 100);
        } else {
          this.politicalData.percentTotalDemocrats = null;
        }
        if(this.politicalData.totalEmployee != 0) {
          this.politicalData.percentEmployeeToDemocrats = parseInt(this.politicalData.democratEmployee/this.politicalData.totalEmployee * 100);
        } else {
          this.politicalData.percentEmployeeToDemocrats = null;
        }
        if(this.politicalData.totalPAC != 0) {
          this.politicalData.percentPACToDemocrats = parseInt(this.politicalData.democratPAC/this.politicalData.totalPAC * 100);
        } else {
          this.politicalData.percentPACToDemocrats = null;
        }

        this.shopStatus = this.props.data.shopStatus;
        
    }
  }

  render() {
    return (
      <div>
        {this.props.popup && 
          (
          <div id="pages">
              <Popup data={this.props.data}/>
          </div>
          )
        }
        {this.props.ribbon && 
          (
          <Ribbon shopStatus={this.shopStatus}/>
          )
        }
      </div>
      
    );
   
  }
}

export default Extension;
