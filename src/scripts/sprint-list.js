(function () {
    customElements.define('sprint-list', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let badgeDict = await API.getBadgeDict();
            let sprint = await API.read("/dreams-html-only-sample/src/data/sprints.json");
            this.renderPosts({sprint, badgeDict});
        }

        renderPosts({sprint, badgeDict}) {
            var mclass = this.attributes.mclass?.value || '';

            this.innerHTML = sprint.map(sprint => `<div class="mui-panel ${mclass}"><sprint-indiv name="${sprint.name}" icon="${sprint.current?badgeDict[6].icon:''}"></sprint-indiv></div>`).join('');
        }
    });
})();
