(function () {
    customElements.define('sprint-list', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.sprint;
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let sprints = await this._model.getAll();
            this.renderPosts({sprints});
        }

        renderPosts({sprints}) {
            this.innerHTML = sprints
                .map(sprint => `<sprint-indiv uid="${sprint}"></sprint-indiv>`)
                .join('');
        }
    });
})();
