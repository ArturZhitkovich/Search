const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const requestURL = 'https://www.mrsoft.by/data.json';
const url = proxyUrl + requestURL;

const Api = {};

Api.loadData = () => fetch(url)
    .then(r => r.json())
    .then(({data}) => data)

export default Api;