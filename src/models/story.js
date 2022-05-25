(function () {
    API.models.story = {};

    API.models.story.getAll = async function (sprintid) {
        let story = await API.read("/dreams-html-only-sample/src/data/stories.json");
        return story.filter(m => m.sprintid == sprintid).map(m => m.id);
    }
})();