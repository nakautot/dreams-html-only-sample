(function () {
    API.models.sprint = {};

    API.models.sprint.currentSprint = async function () {
        let sprint = await API.read("/dreams-html-only-sample/src/data/sprints.json");
        return sprint.filter(m => m.current)[0].id;
    }

    API.models.sprint.getById = async function (id) {
        let sprint = await API.read("/dreams-html-only-sample/src/data/sprints.json");
        return sprint.find(m => m.id == id);
    }

    API.models.sprint.getAll = async function () {
        let sprint = await API.read("/dreams-html-only-sample/src/data/sprints.json");
        sprint.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
        return sprint.map(m => m.id);
    }

    API.models.sprint.selectedSprint = async function () {
        return null;
    }
})();