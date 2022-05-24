let API = {};

(function () {
    API.read = async function (url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    };
})();
