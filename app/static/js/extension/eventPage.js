const Storage = require('static/js/extension/storage');
const Background = {
	tabWiseData: {},
	redirects: {},

//do time validation here for all ribbons, make time related code common, pass indication to load data
	loadPoliticalData: function (request, sender, sendResponse){
		var redirectArray = Background.redirects[sender.tab.id];
		Background.redirects[sender.tab.id] = [];
		var manifestData = chrome.runtime.getManifest();
		Storage.getUserId(function(userId){
			var postData = {};
			postData.url = encodeURIComponent(request.url);
			postData.userId = userId.userId;
			postData.autoLoad = request.autoLoad;
			postData.forceLoad = request.forceLoad;
			
			$.ajax({url:Config[Config.env].endpoints.politicalData, 
				cache: false,
				data:  JSON.stringify(postData),
				type:'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: function(data){
					Background.handlePoliticalDataResponse(data, request, sender, sendResponse);
				}
			});
		});
	},
	handlePoliticalDataResponse: function(serverData, request, sender, sendResponse){
		//debugger;
		if(serverData && serverData.politicalData && serverData.politicalData.percentTotalDemocrats){
			Storage.getSettingsCheckboxValues(function(settingsCheckboxValues){
				
				const shopStatus = serverData.politicalData.shopStatus;
				let iconPath = '';
				if(shopStatus === 'NO'){
					iconPath = "static/images/bookmark-red.png";
				}
				else if(shopStatus === 'OK'){
					iconPath = "static/images/bookmark-purple.png";
				}
				else if(shopStatus === 'YES') {
					iconPath = "static/images/bookmark-blue.png";
				}
				chrome.pageAction.setIcon({
					tabId: sender.tab.id,
	  				path : iconPath
				});
				if(request.autoLoad && !settingsCheckboxValues.settingsCheckboxValues.notifyActionsCheckbox){
					return false;
				}
				Background.tabWiseData[sender.tab.id] = Background.tabWiseData[sender.tab.id] || {};
				Background.tabWiseData[sender.tab.id].data = $.extend(serverData, settingsCheckboxValues);
				chrome.pageAction.show(sender.tab.id);
				sendResponse({'popup': request.forceLoad, 'ribbon':!request.forceLoad});
				return true;
			});
		}
		else {
			chrome.pageAction.hide(sender.tab.id);
		}
	},
	messageListener: function(request, sender, sendResponse){
	
		switch(request.command){
			case "LOAD_POLITICAL_DATA" : {
				Background.loadPoliticalData(request, sender, sendResponse);
				return true;
			}
			case "GET_DATA" : {
				
				if(Background.tabWiseData[sender.tab.id] && Background.tabWiseData[sender.tab.id].data){
					sendResponse(Background.tabWiseData[sender.tab.id].data);
					return true;
				}
				return false;
				
			}
			case "CLOSE_IFRAME" : {
				chrome.tabs.sendMessage(sender.tab.id, {"command":"CLOSE_IFRAME"});
				return true;
			}
			case "OPEN_IFRAME_POPUP" : {
				chrome.tabs.sendMessage(sender.tab.id, {"command":"OPEN_IFRAME_POPUP"});
				return true;
			}
			case "RESIZE_HEIGHT_IFRAME" : {
				chrome.tabs.sendMessage(sender.tab.id, request);
				return true;
			}
			case "SET_SETTINGS_CHECKBOX_VALUE" : {
				Storage.setSettingsCheckboxValue(request.checkboxName, request.value);
				return true;
			}
			case "OPEN_LINK_NEW_TAB" : {
				chrome.tabs.create({active:true , url : request.url});
				return true;
			}
		}
	},
	randomUUID: function(){
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
}


chrome.runtime.onMessage.addListener(Background.messageListener);
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        Storage.clearAll();
        Storage.setSettingsCheckboxValueDefaultValue();
        // Storage.setLastShownTimeActions();	
        Storage.setUserId(Background.randomUUID());
        let url = chrome.extension.getURL ("index.html?type=carousel");
	    chrome.tabs.create({active:true , url : url});
    }else if(details.reason == "update"){
      
    }
});
chrome.runtime.setUninstallURL('https://progressiveshopper.com/uninstall/');
chrome.pageAction.onClicked.addListener(function(tab) { 
	chrome.tabs.sendMessage(tab.id, {"command":"INVOKE_INIT", autoLoad: false, forceLoad: true});
});
