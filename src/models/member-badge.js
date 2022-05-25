(function () {
    API.models.memberBadge = {};

    API.models.memberBadge.getById = async function (uid, sprintid) {
        let memberBadge = await API.read("/dreams-html-only-sample/src/data/member-badge.json");
        return memberBadge.filter(m => m.memberid == uid).filter(m => !m.sprintid || m.sprintid == sprintid);
    }
})();