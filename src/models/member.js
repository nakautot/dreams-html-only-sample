(function () {
    API.models.member = {};

    API.models.member.fetch = async function () {
        return await API.read("/dreams-html-only-sample/src/data/members.json");
    }

    API.models.member.getById = async function (id) {        
        let members = await API.models.member.fetch();
        return members.find(m => m.id == id);
    }

    API.models.member.getAll = async function (id) {        
        let members = await API.models.member.fetch();
        return members.map(m => m.id);
    }
})();