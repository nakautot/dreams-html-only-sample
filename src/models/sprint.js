(function () {
    API.models.sprint = {
        async fetch () {
            return await API.read("/dreams-html-only-sample/src/data/sprints.json");
        },

        async isCurrentSprint (sprintId) {
            return (await this.currentSprint()) == sprintId;
        },

        async currentSprint () {
            let sprint = await this.fetch();
            return sprint.filter(m => m.current)[0].id;
        },

        async getById (id) {
            let sprint = await this.fetch();
            return sprint.find(m => m.id == id);
        },

        async getAll () {
            let sprint = await this.fetch();
            sprint.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
            return sprint.map(m => m.id);
        },

        getSelectedSprint () {
            return this._selectedSprint;
        },

        setSelectedSprint (selectedSprint) {
            API.models.sprint._selectedSprint = selectedSprint;
        }
    };
})();