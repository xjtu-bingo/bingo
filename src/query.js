export const GraphQL = endpoint => (query, variables = null) =>
    fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, variables})
    });

export default GraphQL('http://120.25.205.159:3000');