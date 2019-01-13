const Storage = {
	clearAll : function(){
		chrome.storage.local.clear();
	},
	setSettingsCheckboxValue: function(checkboxName, value){
		chrome.storage.local.get('settingsCheckboxValues', function(data){
			data.settingsCheckboxValues[checkboxName] = value;
			chrome.storage.local.set(data);
		});
	},
	setSettingsCheckboxValueDefaultValue: function(){
		chrome.storage.local.set({'settingsCheckboxValues': {
			notifyActionsCheckbox: true
		}});
	},
	getSettingsCheckboxValues(callBackFunction){
		chrome.storage.local.get('settingsCheckboxValues', callBackFunction);
	},
	setUserId: function(userId){
		chrome.storage.local.set({'userId': userId});
	},
	getUserId: function(callBackFunction){
		chrome.storage.local.get('userId', callBackFunction);
	}
}
module.exports = Storage;