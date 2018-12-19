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
  getStyles = ()=>{
    let styles = {};
    
      styles['--overall-contribution'] = `${this.percentTotalDemocrats}% ${100-this.percentTotalDemocrats}%`
      
    
      styles['--employee-contribution'] = `${this.percentEmployeeToDemocrats}% ${100-this.percentEmployeeToDemocrats}%`
    
    
      styles['--pac-contribution'] = `${this.percentPacToDemocrats}% ${100-this.percentPacToDemocrats}%`
    
      
    return styles;
  }
  render() {
    return (
      <div style={this.getStyles()}>
        {this.props.carousel && 
          (
            <div id="carouselDiv">
                 <Slider />
            </div>
          )
        }
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
