importScripts('../../config.js');


const Background = {
	tabWiseData: {},
	redirects: {},

//do time validation here for all ribbons, make time related code common, pass indication to load data
	loadPoliticalData: function (request, sender, sendResponse){
		var redirectArray = Background.redirects[sender.tab.id];
		Background.redirects[sender.tab.id] = [];
		var manifestData = chrome.runtime.getManifest();
		var postData = {};
		//console.log(request);
		postData.url = encodeURIComponent(request.url);
		postData.autoLoad = request.autoLoad;
		postData.forceLoad = request.forceLoad;


		fetch(Config[Config.env].endpoints.politicalData, {
			// Adding method type
			method: "POST",
			// Adding body or contents to send
			body: JSON.stringify(postData),
			headers: {
				"Content-type": "application/json"
			}
		})
		// Converting to JSON
		.then(response => response.json())
		// Displaying results to console
		.then(json => Background.handlePoliticalDataResponse(json, request, sender, sendResponse) );
	},
	
	handlePoliticalDataResponse: function(serverData, request, sender, sendResponse){
		//debugger;
		console.log('server data', serverData)
		//console.log(request);
		//console.log(sender);
		//console.log(sendResponse);
		if(serverData && serverData.politicalData && serverData.politicalData.percentTotalDemocrats){
			const shopStatus = serverData.politicalData.shopStatus;
			let iconPath = '';
			if(shopStatus === 'NO'){
				iconPath = "../images/bookmark-red.png";
			}
			else if(shopStatus === 'OK'){
				iconPath = "../images/bookmark-purple.png";
			}
			else if(shopStatus === 'YES') {
				iconPath = "../images/bookmark-blue.png";
			}
			chrome.action.setIcon({
				tabId: sender.tab.id,
				path : {
					'16': iconPath,
					'24': iconPath,
					'32': iconPath
				}
			});
			const tab_id = sender.tab.id;
			//console.log("tab Id: ", tab_id);
			Background.tabWiseData[tab_id] = Background.tabWiseData[tab_id] || {};
			Background.tabWiseData[tab_id].data = serverData;
			//chrome.action.show(sender.tab.id);
			sendResponse({'popup': request.forceLoad, 'ribbon':!request.forceLoad, 'data': serverData});
			return true;
		}
		else {
			//chrome.action.hide(sender.tab.id);
		}
	},


	messageListener: function(request, sender, sendResponse){
		switch(request.command){
			case "LOAD_POLITICAL_DATA" : {
				Background.loadPoliticalData(request, sender, sendResponse);
				return true;
			}
			case "GET_DATA" : {
				try {
					if(Background.tabWiseData[sender.tab.id] && Background.tabWiseData[sender.tab.id].data){
						sendResponse(Background.tabWiseData[sender.tab.id].data);
						return true;
					}
				}
				catch(err) {
					return false;
				}
				//return false;
				
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
			case "OPEN_LINK_NEW_TAB" : {
				chrome.tabs.create({active:true , url : request.url});
				return true;
			}
		}
		return true;
	}
}


chrome.runtime.onMessage.addListener(Background.messageListener);
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        //let url = chrome.runtime.getURL ("index.html?type=carousel");
	    //chrome.tabs.create({active:true , url : url});
    }else if(details.reason == "update"){
      
	}
});
//chrome.runtime.setUninstallURL('https://progressiveshopper.com/uninstall/');
chrome.action.onClicked.addListener(function(tab) { 
	chrome.tabs.sendMessage(tab.id, {"command":"INVOKE_INIT", autoLoad: false, forceLoad: true});
});
