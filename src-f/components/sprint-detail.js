(function () {
    customElements.define('sprint-detail', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.sprint;
            this._helper = API.helpers.sprint;
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            this.getModel();
            window.addEventListener('change-sprint', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('change-sprint', this.refreshView);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        refreshView() {
            this.getModel();
        }

        async getModel() {
            let currentSprint = await this._model.currentSprint();
            let sprintid = this._model.getSelectedSprint() || currentSprint;
            let sprint = await this._model.getById(sprintid);
            let stories = await API.models.story.getAllWithDetails(sprintid);
            let onlyStories = await API.models.story.getAllStoriesWithDetails(sprintid);
            let onlyDefects = await API.models.story.getAllDefectsWithDetails(sprintid);
            let onlySupport = await API.models.story.getAllSupportWithDetails(sprintid);

            let mostStories = await API.models.story.getMostStories(sprintid, true);
            let mostDefects = await API.models.story.getMostDefects(sprintid, true);
            let mostSupport = await API.models.story.getMostSupport(sprintid, true);
            let mostTested = await API.models.story.getMostTested(sprintid, true);
            let mostTCCreated = await API.models.story.getMostTCCreated(sprintid, true);
            let mostRCAed = await API.models.story.getMostRCA(sprintid, true); 

            this.renderPosts({sprint, stories, currentSprint, onlyStories, onlyDefects, onlySupport, mostStories, mostDefects, mostSupport, mostTested, mostTCCreated, mostRCAed});
        }

        renderPosts({sprint, stories, currentSprint, onlyStories, onlyDefects, onlySupport, mostStories, mostDefects, mostSupport, mostTested, mostTCCreated, mostRCAed}) {    
            let storiesList = stories.map(m => `<story-indiv uid="${m.id}"></story-indiv>`).join('');
            let currentSprintBadge = sprint.id == currentSprint ? '<badge-icon uid="6"></badge-icon>' : '';

            let info = [[{
                label: '# of Stories',
                value: onlyStories.length
            }, {
                label: '# of Defects',
                value: onlyDefects.length
            }, {
                label: '# of Support',
                value: onlySupport.length
            }], [{
                label: `Most Stories`,
                value: mostStories
            }, {
                label: `Most Fixes`,
                value: mostDefects
            }, {
                label: `Most Support`,
                value: mostSupport
            }], [{
                label: `Most Tested`,
                value: mostTested
            }, {
                label: `Most TC Created`,
                value: mostTCCreated
            }, {
                label: `Most Investigated`,
                value: mostRCAed
            }]].map(m => m.map(n => `
                    <div class="mui-col-md-2 mui--text-right">${n.label}</div>
                    <div class="mui-col-md-2">${n.value}</div>`).join(''))
                .join('</div><div class="mui-row">')


            this.innerHTML = `
                <div>
                    <div class="mui--text-headline">${sprint.name} Sprint ${currentSprintBadge}</div>
                    <div class="mui-divider"></div>
                    <br />
                    <div class="mui-container-fluid"><div class="mui-row">${info}</div></div>
                    <br />
                    ${storiesList}
                </div>
            `;
        }
    });
})();
