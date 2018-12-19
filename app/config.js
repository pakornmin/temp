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
			politicalData: 'https://f7bcc57jc4.execute-api.us-east-2.amazonaws.com/test/politicaldata'
		}
	},
	prod: {
			endpoints : {
			politicalData: 'https://ykhbiaf1z7.execute-api.us-east-2.amazonaws.com/prod/politicaldata '
		}
	}
}