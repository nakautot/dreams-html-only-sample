(function () {
    API.models.story = {
        async fetch () {
            return await API.read("/dreams-html-only-sample/src-f/data/stories.json");
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
        },

        async getMostStories (sprintid, formatted) {
            let onlyStories = await this.getAllStoriesWithDetails(sprintid);
            return formatted ? API.helpers.sprint.getMost(onlyStories, 3) : API.helpers.sprint.getMostRaw(onlyStories, 3);
        },

        async getMostDefects (sprintid, formatted) {
            let onlyDefects = await this.getAllDefectsWithDetails(sprintid);
            return formatted ? API.helpers.sprint.getMost(onlyDefects, 3) : API.helpers.sprint.getMostRaw(onlyDefects, 3);
        },

        async getMostSupport (sprintid, formatted) {
            let onlySupport = await this.getAllSupportWithDetails(sprintid);
            return formatted ? API.helpers.sprint.getMost(onlySupport, 3) : API.helpers.sprint.getMostRaw(onlySupport, 3);
        },

        async getMostTested (sprintid, formatted) {
            let stories = await this.getAllWithDetails(sprintid);
            return formatted ? API.helpers.sprint.getMost(stories, 2) : API.helpers.sprint.getMostRaw(stories, 2);
        },

        async getMostTCCreated (sprintid, formatted) {
            let stories = await this.getAllWithDetails(sprintid);
            return formatted ? API.helpers.sprint.getMost(stories, 8) : API.helpers.sprint.getMostRaw(stories, 8);
        },

        async getMostRCA (sprintid, formatted) {
            let stories = await this.getAllWithDetails(sprintid);
            return formatted ? API.helpers.sprint.getMost(stories, 7) : API.helpers.sprint.getMostRaw(stories, 7);
        }
    };
})();