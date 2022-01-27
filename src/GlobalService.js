import axios from 'axios';

let configs = { "url": "https://api.giphy.com/v1/gifs/" };


class Service {
    endpoint = configs.url;

    getBearer = () => {
        let key;
        key = localStorage.getItem('jwtToken');
        if (!key) key = sessionStorage.getItem('jwtToken');
        return JSON.parse(key);
    }
    strapiBearer = this.getBearer();

    getHeaders = (header = {}) => {
        const _headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.strapiBearer}`,
            ...header
        }
        return _headers;
    }

    mountQuery = (query) => {
        if (!query) return "";
        const mount = Object.keys(query).map(key => {
            return `${key}=${query[key]}`
        });
        return `?${mount.join('&')}`;
    }

    request = (method, _url, headers, query, body = {}) => {
        const url = `${this.endpoint}${_url}${this.mountQuery(query)}`
        var config = {
            method, url, headers, data: JSON.stringify(body)
        };
        // console.log(config);
        return axios(config).then(resp => resp.data)
    }

    findGiphs = async (term, page, setSearchCounter, setGiphLib) => {
        const fetch = await this.request('GET', 'search', this.getHeaders(), {
            api_key: 'SrNDsmaYT744CL6FRqngQ5jH2dy1IXuJ',
            q: term,
            limit: 30,
            offset: page * 30,
            rating: 'g',
            lang: 'en'
        });

        setSearchCounter(fetch.pagination.total_count);
        setGiphLib(fetch.data);
    }
}

export default Service