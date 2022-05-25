(function () {
    API.models.badge = {};

    API.models.badge.fetch = async function () {
        API.models.badge.badgeDict = API.models.badge.badgeDict || 
            API.group(await API.read("/dreams-html-only-sample/src/data/badge.json"), 'id');
    }

    API.models.badge.getById = async function (id) {        
        return API.models.badge.badgeDict[id];
    }
})();