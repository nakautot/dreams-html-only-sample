(function () {
    let tmpl = document.createElement('template');    

    customElements.define('sprint-detail', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let sprintid = (await API.models.sprint.selectedSprint()) || (await API.models.sprint.currentSprint());
            let stories = await API.models.story.getAll(sprintid);
            this.renderPosts({stories});
        }

        renderPosts({stories}) {
            this.innerHTML = `
                <div class="mui-panel">heller</div>
            `;
        }
    });
})();
