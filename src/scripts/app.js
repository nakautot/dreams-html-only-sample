let API = {
    _cache: {},
    _ts: (new Date()).getTime()
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

    API.getBadgeDict = async function () {
        let badge = await API.read("/dreams-html-only-sample/src/data/badge.json");
        return API.group(badge, 'id');
    }

    API.currentSprint = async function () {
        let sprint = await API.read("/dreams-html-only-sample/src/data/sprints.json");
        return sprint.filter(m => m.current)[0].id;
    }
})();
