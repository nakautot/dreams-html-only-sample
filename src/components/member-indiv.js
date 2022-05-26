(function () {
    customElements.define('member-indiv', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            this.refreshView();
            window.addEventListener('change-sprint', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('change-sprint', this.refreshView);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        refreshView() {  
            let uid = this.attributes.uid.value;          
            this.getModel({uid});
        }

        async getModel({uid}) {
            let currentSprint = await API.models.sprint.currentSprint();
            let sprintid = API.models.sprint.getSelectedSprint() || currentSprint;
            let member = await this._model.getById(uid);
            let memberBadge = await API.models.memberBadge.getById(uid, sprintid);            
            this.renderPosts({memberBadge, member});
        }

        renderPosts({memberBadge, member: {username, id}}) {
            let currbadges = memberBadge
                .map(m => `<badge-icon uid="${m.badgeid}"></badge-icon>`)
                .join('');

            this.innerHTML = `
                <span>
                    <div><member-img uid="${id}" width="80" height="80"></member-img></div>
                    <div>${username}</div>
                    <div class="mui-divider"></div>
                    <div class="badges">&nbsp;${currbadges}</div>
                </span>
            `;
        }
    });
})();
