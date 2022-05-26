(function () {
    API.models.member = {
        async fetch () {
            return await API.read("/dreams-html-only-sample/src/data/members.json");
        },

        async getById (id) {        
            let members = await this.fetch();
            return members.find(m => m.id == id);
        },

        async getAll (id) {        
            let members = await this.fetch();
            return members.map(m => m.id);
        },

        getSelectedMember () {
            return this._selectedMember;
        },

        setSelectedMember (selectedMember) {
            this._selectedMember = selectedMember;
        }
    };
})();