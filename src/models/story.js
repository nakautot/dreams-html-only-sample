(function () {
    API.models.story = {
        async fetch () {
            return await API.read("/dreams-html-only-sample/src/data/stories.json");
        },

        async getAll (sprintid) {
            let story = await this.getAllWithDetails(sprintid);
            return story.map(m => m.id);
        },

        async getAllWithDetails (sprintid) {
            let story = await this.fetch();
            return story.filter(m => m.sprintid == sprintid);
        },

        async getById (id) {
            let story = await this.fetch();
            return story.find(m => m.id == id);
        }
    };
})();