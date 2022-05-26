(function () {
    customElements.define('member-detail', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            window.addEventListener('change-member', this.refreshView);
            window.addEventListener('change-sprint', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('change-member', this.refreshView);
            window.removeEventListener('change-sprint', this.refreshView);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        refreshView() {  
            this.getModel();
        }

        async getModel() {
            let selectedMember = this._model.getSelectedMember();
            let member = await this._model.getById(selectedMember);
            if(!member) return;

            let currentSprint = await API.models.sprint.currentSprint();
            let sprintid = API.models.sprint.getSelectedSprint() || currentSprint;
            let sprint = await API.models.sprint.getById(sprintid);            
            let stories = await API.models.story.getAllWithDetails(sprintid);

            let allStories = await API.models.story.getAllStoriesWithDetails(sprintid);
            this.renderPosts({member, sprint, stories, allStories});
        }

        renderPosts({member, sprint, stories, allStories}) {
            let onlyStories = API.helpers.sprint.getMemberTotal(member.id, allStories, 3);
            
            let info = [[{
                label: '# of Stories',
                value: onlyStories.length
            }],[{
                label: 'Story Contribution',
                value: `${(((onlyStories.length / stories.length) || 0) * 100).toFixed(1)}%`
            }]].map(m => m.map(n => `<div class="mui-col-md-2"><b>${n.label} : </b>${n.value}</div>`).join(''))
            .join('</div><div class="mui-row">')

            this.innerHTML = `
                <div class="header mui--text-headline"><member-img uid="${member.id}" width="25" height="25"></member-img> ${member.username.toUpperCase()}'s stats for ${sprint.name}</div>
                <div class="mui-divider"></div>
                <br />
                <div class="mui-container-fluid"><div class="mui-row">${info}</div></div>`;
        }
    });
})();
