(function () {
    customElements.define('sprint-indiv', class extends HTMLElement {
        constructor() {
            super();
            this.postSelected = this.postSelected.bind(this);
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
            this.addEventListener('click', this.postSelected);
            window.addEventListener('refresh-sprint-indiv', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('refresh-sprint-indiv', this.refreshView);
            this.removeEventListener('click', this.postSelected);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        postSelected() {
            let uid = this.attributes.uid.value;
            API.models.sprint.setSelectedSprint(uid);
            window.dispatchEvent(new CustomEvent('change-sprint'));
            window.dispatchEvent(new CustomEvent('refresh-sprint-indiv'));
            this.getModel({uid});
        }

        refreshView() {   
            let uid = this.attributes.uid.value;         
            this.getModel({uid});
        }

        async getModel({uid}) {
            let sprint = await API.models.sprint.getById(uid);
            let currentSprint = await API.models.sprint.currentSprint();
            this.renderPosts({sprint, currentSprint});
        }

        renderPosts({sprint, currentSprint}) {
            let selected = API.models.sprint.getSelectedSprint();
            let isCurrentSprint = sprint.id == currentSprint;
            let selectedClass = selected == sprint.id || !selected && isCurrentSprint ? 'mui--bg-primary-light' : '';
            this.innerHTML = `
                <div class="mui-panel sprint ${selectedClass} clickable">
                    <b>${sprint.name}</b> ${sprint.id == currentSprint ? '<badge-icon uid="6"></badge-icon>' : ''}
                </div>
            `;
        }
    });
})();
