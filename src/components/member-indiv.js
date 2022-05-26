(function () {
    customElements.define('member-indiv', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
            this.postSelected = this.postSelected.bind(this);
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            this.refreshView();
            this.addEventListener('click', this.postSelected);
            window.addEventListener('change-member', this.refreshView);
            window.addEventListener('change-sprint', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('change-member', this.refreshView);
            window.removeEventListener('change-sprint', this.refreshView);
            this.removeEventListener('click', this.postSelected);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        postSelected() {
            let uid = this.attributes.uid.value;
            this._model.setSelectedMember(uid);
            window.dispatchEvent(new CustomEvent('change-member'));
            this.getModel({uid});
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
            let selected = this._model.getSelectedMember();
            let currbadges = memberBadge
                .map(m => `<badge-icon uid="${m.badgeid}"></badge-icon>`)
                .join('');

            let selectedClass = selected == id ? 'mui--bg-primary-light' : '';

            this.innerHTML = `
                <div class="mui-panel member ${selectedClass}">
                    <div><member-img uid="${id}" width="80" height="80"></member-img></div>
                    <div>${username}</div>
                    <div class="mui-divider"></div>
                    <div class="badges">&nbsp;${currbadges}</div>
                </div>
            `;
        }
    });
})();
