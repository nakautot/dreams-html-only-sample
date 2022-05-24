(function () {
    customElements.define('sprint-list', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let sprint = await API.read("/dreams-html-only-sample/src/data/sprints.json");
            this.renderPosts(sprint);
        }

        renderPosts(sprint) {
            var mclass = this.attributes.mclass?.value || '';

            this.innerHTML = sprint.map(sprint => `<div class="mui-panel ${mclass}"><sprint-indiv name="${sprint.name}"></sprint-indiv></div>`).join('');
        }
    });
})();
