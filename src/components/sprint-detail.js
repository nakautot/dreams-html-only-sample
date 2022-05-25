(function () {
    customElements.define('sprint-detail', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let sprintid = (await API.models.sprint.selectedSprint()) || (await API.models.sprint.currentSprint());
            let sprint = await API.models.sprint.getById(sprintid);
            let stories = await API.models.story.getAll(sprintid);

            this.renderPosts({sprint, stories});
        }

        renderPosts({sprint, stories}) {    
            let storiesList = stories.map(m => `<story-indiv uid="${m}"></story-indiv>`).join();
            this.innerHTML = `
                <div>
                    <div class="mui--text-headline">${sprint.name} Sprint</div>
                    <div class="mui-divider"></div>
                    <br />
                    ${storiesList}
                </div>
            `;
        }
    });
})();
