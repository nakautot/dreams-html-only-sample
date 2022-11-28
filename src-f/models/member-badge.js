(function () {
    API.models.memberBadge = {
        async getById (uid, sprintid) {
            let memberBadge = await API.read("/dreams-html-only-sample/src-f/data/member-badge.json");
            return memberBadge.filter(m => m.memberid == uid).filter(m => !m.sprintid || m.sprintid == sprintid);
        }
    };
})();