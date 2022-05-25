(function () {
    customElements.define('sprint-list', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let sprints = await API.models.sprint.getAll();
            this.renderPosts({sprints});
        }

        renderPosts({sprints}) {
            this.innerHTML = sprints
                .map(sprint => `<div class="mui-panel sprint"><sprint-indiv uid="${sprint}"></sprint-indiv></div>`)
                .join('');
        }
    });
})();
