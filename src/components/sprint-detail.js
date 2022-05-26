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

            this.renderPosts({sprint, stories, currentSprint});
        }

        renderPosts({sprint, stories, currentSprint}) {    
            let storiesList = stories.map(m => `<story-indiv uid="${m.id}"></story-indiv>`).join();
            let currentSprintBadge = sprint.id == currentSprint ? '<badge-icon uid="6"></badge-icon>' : ''
            
            let onlyStories = stories.filter(m => m.icon == 14 || m.icon == 16 || m.icon == 17);
            let onlyDefects = stories.filter(m => m.icon == 11);
            let onlySupport = stories.filter(m => m.icon == 15);
            let mostStories = this._helper.getMost(onlyStories, 3);
            let mostDefects = this._helper.getMost(onlyDefects, 3);
            let mostSupport = this._helper.getMost(onlySupport, 3);
            let mostTested = this._helper.getMost(stories, 2);
            let mostTCCreated = this._helper.getMost(stories, 8);
            let mostRCA = this._helper.getMost(stories, 7);

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
                value: mostRCA
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
