(function () {
    API.models.badge = {
        async fetch () {
            this.badgeDict = this.badgeDict || API.group(await API.read("/dreams-html-only-sample/src-f/data/badge.json"), 'id');
        },

        async getById (id) {        
            return API.models.badge.badgeDict[id];
        }
    };
})();