(function () {
    customElements.define('member-list', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let membersIds = await API.models.member.getAll();
            this.renderPosts(membersIds);
        }

        renderPosts(membersIds) {
            this.innerHTML = membersIds
                .map(membersId => `<div class="mui-panel member"><member-indiv uid="${membersId}"></member-indiv></div>`)
                .join('');
        }
    });
})();
