import * as config from './config.json';

export const GraphQL = endpoint => (query, variables = null) =>
    fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, variables})
    });

export default GraphQL(config.server.endpoint);