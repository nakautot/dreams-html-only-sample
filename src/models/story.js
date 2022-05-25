(function () {
    API.models.story = {
        async fetch () {
            return await API.read("/dreams-html-only-sample/src/data/stories.json");
        },

        async getAll (sprintid) {
            let story = await this.fetch();
            return story.filter(m => m.sprintid == sprintid).map(m => m.id);
        },

        async getById (id) {
            let story = await this.fetch();
            return story.find(m => m.id == id);
        }
    };
})();