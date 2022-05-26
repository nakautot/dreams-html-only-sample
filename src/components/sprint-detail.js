(function () {
    customElements.define('sprint-detail', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.sprint;
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

        getMost (onlyStories) {
            let allStories = onlyStories.map(m => m.members.find(n => n.badge == 3).id);
            let msRaw = allStories.reduce((p,c) => {
                p[c] = (p[c] || 0) + 1;
                return p;
            }, {});
            let maxStories = (Math.max(Object.keys(msRaw).map(m => msRaw[m])));
            
            return Object.keys(msRaw)
                .filter(m => msRaw[m] == maxStories)
                .map(m => `<member-img uid="${m}" width="20" height="20"></member-img>`);

        }

        renderPosts({sprint, stories, currentSprint}) {    
            let storiesList = stories.map(m => `<story-indiv uid="${m.id}"></story-indiv>`).join();
            let currentSprintBadge = sprint.id == currentSprint ? '<badge-icon uid="6"></badge-icon>' : ''
            
            let onlyStories = stories.filter(m => m.icon == 14);
            let onlyDefects = stories.filter(m => m.icon == 11);
            let onlySupport = stories.filter(m => m.icon == 15);
            let mostStories = this.getMost(onlyStories);
            let mostDefects = this.getMost(onlyDefects);
            let mostSupport = this.getMost(onlySupport);

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
