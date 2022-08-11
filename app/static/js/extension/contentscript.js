const ContentScript = {
	iframeId: "shopforcause_iframe",
	init: function(autoLoad, forceLoad){
		chrome.runtime.sendMessage( 
			{"command":"LOAD_POLITICAL_DATA", 
				url : window.location.href, 
				host: window.location.host,
				autoLoad: autoLoad,
				forceLoad: forceLoad
			}, 
			function(response){
				if(response){
					if(response.popup){
						ContentScript.openIframePopup();
					}
					else if(response.ribbon){
						ContentScript.openIframeRibbon(response.data);
						
					}
				}
			});
	},
	openIframePopup(){
		ContentScript.removeIframe();
		ContentScript.insertIframe('popup');

	},
	openIframeRibbon(data){
		ContentScript.removeIframe();
		ContentScript.insertIframe('ribbon',data);

	},
	removeIframe: function(){
		 var frame = document.getElementById("shopforcause_iframe");
		 if(frame){
			 frame.parentNode.removeChild(frame);
		 }
	},
	insertIframe: function(type, data){
		var iFrame  = document.createElement ("iframe");
    	iFrame.id = 'shopforcause_iframe';
		if(type !== "carousel") {
			iFrame.src  = chrome.runtime.getURL("../../index.html?type="+type);
			iFrame.style.cssText = (type === 'popup'? ContentScript.getPopupIframeStyle() : ContentScript.getRibbonIframeStyle(data)) ;
			document.body.insertBefore (iFrame, document.body.firstChild);
		}
	},
	getPopupIframeStyle: function(){
		return 'position:fixed;top:0;right:0px;display:block;width:390px;height:614px;z-index:99999999 !important;border-width: 1px !important;';
	},
	getRibbonIframeStyle: function(data){
		var hw = 'width:30px;height:30px;';
		return 'position:fixed;float:right;top:0;right:20px;border: 0;'+hw+'z-index:99999999 !important';
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
				ContentScript.openIframeRibbon(request.data);
				return true;
			}
	  }
});