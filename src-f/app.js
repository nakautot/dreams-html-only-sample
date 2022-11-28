let API = {
    _cache: {},
    _ts: (new Date()).getTime(),
    models: {},
    helpers: {}
};

(function () {
    API.read = async function (url) {
        let urlWithTs = `${url}?ts=${API._ts}`;

        if(this._cache[urlWithTs])
            return this._cache[urlWithTs];

        let response = await fetch(urlWithTs);
        let data = await response.json();
        this._cache[urlWithTs] = data;
        return data;
    };

    API.group = function (arr, key) {
        return arr.reduce((prev, curr) => {
            prev[curr[key]] = curr;
            return prev;
        }, {});
    }
})();
