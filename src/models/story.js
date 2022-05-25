(function () {
    API.models.story = {};

    API.models.story.fetch = async function () {
        return await API.read("/dreams-html-only-sample/src/data/stories.json");
    }

    API.models.story.getAll = async function (sprintid) {
        let story = await API.models.story.fetch();
        return story.filter(m => m.sprintid == sprintid).map(m => m.id);
    }

    API.models.story.getById = async function (id) {
        let story = await API.models.story.fetch();
        return story.find(m => m.id == id);
    }
})();