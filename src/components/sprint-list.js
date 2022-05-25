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
            let list = sprints
                .map(sprint => `<sprint-indiv uid="${sprint}"></sprint-indiv>`)
                .join('');

            this.innerHTML = `
                <div class="header mui--text-headline">Sprints</div>
                <div class="mui-divider"></div>
                <br />
                <div class="mui-row">
                    <div class="mui-col-md-2">${list}</div>
                    <div class="mui-col-md-10"><sprint-detail></sprint-detail></div>        
                </div>`;
        }
    });
})();
