var Config = {
	env: 'prod',
	analyticsName: 'progressiveshopper',
	dev: {
		endpoints : {
			politicalData: 'http://localhost:8080/sfp/sfpData'
		}
	},
	test: {
			endpoints : {
			politicalData: 'https://api.progressiveshopper.com/sfp/sfpData'
		}
	},
	prod: {
			endpoints : {
			politicalData: 'https://api.progressiveshopper.com/sfp/sfpData'
		}
	}
}