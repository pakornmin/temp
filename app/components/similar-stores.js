import React, { Component, Fragment} from 'react';
import 'static/css/common.css';
import 'static/css/similar_stores.css';
import analytics from 'helpers/analytics.js'
class SimilarStore extends Component {
  constructor(props) {
    super(props);
    this.statusMap = {
        YES:'good.png',
        OK:'ok.png',
        NO:'bad.png'
    }
  }
  onCompanyLinkClick(link){
    analytics.sendEvent('CompetitorsClicked');
    window.openLinkNewTab(link);
  }
  componentDidMount(){
      analytics.sendEvent( 'CompetitorsPageAppeared');
  }
  getStyles = (width) => {
    return {
       width: `${width}%`
    }
  }
  render() {
   
    const similarStores = this.props.similarStores.filter(store => {
       return this.props.merchantDomain !== store.brandDomain;
    });
    const category = this.props.politicalData.primarySubcategory ? this.props.politicalData.primarySubcategory : this.props.politicalData.subCategory;
    
    return (
        <section id="competitors">
            <h2>Other brands within the<br></br>{category} industry</h2>
            <ul>
                {similarStores.map((similarStore, i) => (
                    <Fragment key={i}>
                        <div className="competitor" onClick={() => this.onCompanyLinkClick(similarStore.affiliateLink)}>
                            <li>
                                <div className="brand-logo">
                                    <img src={`https://logo.clearbit.com/${similarStore.brandDomain}?size=56`}/>
                                </div>
                                <div className="brand-name">
                                    {similarStore.name}
                                </div>
                                <div className="status-image">
                                    <img src={`static/images/${this.statusMap[similarStore.shopStatus]}`} alt="" className="status"/>
                                </div>
                            </li>
                        </div>
                    </Fragment>
                ))} 
            </ul>
            <div className="clearbitText">Logos provided by Clearbit</div>  
        </section>
    );
  }
}

export default SimilarStore;
