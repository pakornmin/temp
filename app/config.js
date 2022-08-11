var Config = {
	env: 'prod',
	analyticsName: 'progressiveshopper',
	dev: {
		endpoints : {
			politicalData: 'http://localhost:3000/allInfo/getOneCompany/',
			category: 'http://localhost:3000/allInfo/getCompaniesByCategory/',
			actions: 'http://localhost:3000/action/getAllActions'
		}
	},
	test: {
		endpoints : {
			politicalData: 'https://www.progressiveshopperapi.com/allInfo/getOneCompany/',
			category: 'https://www.progressiveshopperapi.com/allInfo/getCompaniesByCategory/',
			actions: 'https://www.progressiveshopperapi.com/action/getAllActions'
		}
	},
	prod: {
		endpoints : {
			politicalData: 'https://www.progressiveshopperapi.com/allInfo/getOneCompany/',
			category: 'https://www.progressiveshopperapi.com/allInfo/getCompaniesByCategory/',
			actions: 'https://www.progressiveshopperapi.com/action/getAllActions'
		}
	}
}