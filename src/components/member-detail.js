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
            let currentSprint = await API.models.sprint.currentSprint();
            let sprintid = API.models.sprint.getSelectedSprint() || currentSprint;
            let sprint = await API.models.sprint.getById(sprintid);
            let selectedMember = this._model.getSelectedMember();
            let member = await this._model.getById(selectedMember);            
            this.renderPosts({member, sprint});
        }

        renderPosts({member, sprint}) {
            this.innerHTML = `
                <div class="header mui--text-headline"><member-img uid="${member.id}" width="25" height="25"></member-img> ${member.username.toUpperCase()}'s stats for ${sprint.name}</div>
                <div class="mui-divider"></div>
                <br />
                <div>WORK IN PROGRESS</div>`;
        }
    });
})();
