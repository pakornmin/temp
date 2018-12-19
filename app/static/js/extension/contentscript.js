const ContentScript = {
	couponTexBoxObj: null,
	init: function(autoLoad, forceLoad){
		chrome.runtime.sendMessage( 
			{"command":"LOAD_POLITICAL_DATA", 
				url : window.location.href, 
				host: window.location.host,
				autoLoad: autoLoad,
				forceLoad: forceLoad
			}, 
			function(loadExtension){
				if(loadExtension)
					if(loadExtension.popup){
						ContentScript.openIframePopup();
					}
					else if(loadExtension.ribbon){
						ContentScript.openIframeRibbon();
					}
			});
	},
	openIframePopup(){
		ContentScript.removeIframe();
		ContentScript.insertIframe('popup');

	},
	openIframeRibbon(){
		ContentScript.removeIframe();
		ContentScript.insertIframe('ribbon');

	},
	removeIframe: function(){
		 var frame = document.getElementById("shopforcause_iframe");
		 if(frame){
			 frame.parentNode.removeChild(frame);
		 }
	},
	insertIframe: function(type){
		var iFrame  = document.createElement ("iframe");
    	iFrame.id = 'shopforcause_iframe';
		iFrame.src  = chrome.extension.getURL ("index.html?type="+type);
		iFrame.style.cssText = (type === 'popup'? ContentScript.getPopupIframeStyle() : ContentScript.getRibbonIframeStyle()) ;
		document.body.insertBefore (iFrame, document.body.firstChild);
	},
	getPopupIframeStyle: function(){
		return 'position:fixed;top:0;right:0px;display:block;width:360px;height:610px;z-index:99999999 !important;border-width: 1px !important;';
	},
	getRibbonIframeStyle: function(){
		return 'position:fixed;float:right;top:0;right:0px;width:116px;height:75px;border: 0;z-index:99999999 !important';
	}
}

ContentScript.init(true,false);


chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	  switch(request.command){
		  	case "INVOKE_INIT" : {
				ContentScript.init(request.autoLoad, request.forceLoad);
				return true;
			}
			case "OPEN_IFRAME_POPUP" : {
				ContentScript.openIframePopup();
				return true;
			}
			case "CLOSE_IFRAME" : {
				ContentScript.removeIframe();
				return true;
			}
	  }
});