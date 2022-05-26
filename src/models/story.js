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

        async getAllStoriesWithDetails (sprintid) {
            let stories = await this.getAllWithDetails(sprintid);
            return stories.filter(m => m.icon == 14 || m.icon == 16 || m.icon == 17);
        },

        async getAllDefectsWithDetails (sprintid) {
            let stories = await this.getAllWithDetails(sprintid);
            return stories.filter(m => m.icon == 11);
        },

        async getAllSupportWithDetails (sprintid) {
            let stories = await this.getAllWithDetails(sprintid);
            return stories.filter(m => m.icon == 15);
        },

        async getAllSubs (sprintid, badgeId) {
            let stories = await this.getAllWithDetails(sprintid);
            return stories
                .map(m => m.members.find(n => n.badge == badgeId)?.id)
                .filter(m => m);
        },

        async getAllTests (sprintid) {
            return this.getAllSubs(sprintid, 2);
        },

        async getAllRCA (sprintid) {
            return this.getAllSubs(sprintid, 7);
        },

        async getAllTC (sprintid) {
            return this.getAllSubs(sprintid, 8);
        },

        async getById (id) {
            let story = await this.fetch();
            return story.find(m => m.id == id);
        }
    };
})();