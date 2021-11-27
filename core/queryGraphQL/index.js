const fetch = require('cross-fetch')
const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client')

module.exports = async (query, uri) => {

	const client = new ApolloClient({
		link: new HttpLink({ uri: uri, fetch }),
		cache: new InMemoryCache(),
	})

	try {
		const result = await client.query({ query: gql(query) })
		if (result && result.data) {
			return result.data
		}
	}
	catch (err) {
		console.log(err)
	}

	return null
}