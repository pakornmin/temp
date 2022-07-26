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
        this.percentTotalDemocrats = this.politicalData.percentTotalDemocrats;
        this.percentEmployeeToDemocrats = this.politicalData.percentEmployeeToDemocrats;
        this.percentPacToDemocrats = this.politicalData.percentPacToDemocrats;
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
          <Ribbon politicalData={this.props.data.politicalData}/>
          )
        }
      </div>
      
    );
   
  }
}

export default Extension;
