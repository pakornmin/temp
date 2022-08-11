importScripts('../../config.js');


const Background = {
	tabWiseData: {},
	redirects: {},

//do time validation here for all ribbons, make time related code common, pass indication to load data
	loadPoliticalData: async function(request, sender, sendResponse){
		var redirectArray = Background.redirects[sender.tab.id];
		Background.redirects[sender.tab.id] = [];
		var manifestData = chrome.runtime.getManifest();
		var postData = {};
		
		postData.url = encodeURIComponent(request.url);
		postData.autoLoad = request.autoLoad;
		postData.forceLoad = request.forceLoad;

		const endpoint = Config[Config.env].endpoints.politicalData + request.host;
		
		const response = await fetch(endpoint, {
			// Adding method type
			method: "GET"
		});
		
		const jsonResponse =  await response.json();
		Background.handlePoliticalDataResponse(jsonResponse, request, sender, sendResponse);
	},
	
	handlePoliticalDataResponse: async function(serverData, request, sender, sendResponse){
		//debugger

		if(serverData && serverData.politicalData){

			const percentDemocrat = serverData.politicalData.totalDemocrat / serverData.politicalData.total;
			const numIssue = serverData.issueList.length;
			let shopStatus = '';
			if(percentDemocrat >= 0.6 && numIssue == 0) {
				shopStatus = 'YES';
			} else if(	(percentDemocrat >= 0.4 && percentDemocrat <= 0.6) || 
						(percentDemocrat > 0.6 && numIssue != 0)) {
				shopStatus = 'OK';
			} else {
				shopStatus = 'NO';
			}

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
			Background.tabWiseData[tab_id] = Background.tabWiseData[tab_id] || {};
			Background.tabWiseData[tab_id].data = serverData;
			serverData.shopStatus = shopStatus;
			const similarStoresEndpoint = Config[Config.env].endpoints.category + serverData.category;
			
			const similarStores = await fetch(similarStoresEndpoint, {
				// Adding method type
				method: "GET"
			});
			const actionListEndpoint = Config[Config.env].endpoints.actions;
			
			const actionList = await fetch(actionListEndpoint, {
				// Adding method type
				method: "GET"
			});
			const similarStoresJson = await similarStores.json();
			
			const actionListJson = await actionList.json();
			serverData.similarStores = similarStoresJson;
			serverData.actionList = actionListJson;
			
			await sendResponse({'popup': request.forceLoad, 'ribbon':!request.forceLoad, 'data': serverData});
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
