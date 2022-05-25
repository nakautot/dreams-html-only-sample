(function () {
    customElements.define('member-list', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let membersIds = await this._model.getAll();
            this.renderPosts(membersIds);
        }

        renderPosts(membersIds) {
            let list = membersIds
                .map(membersId => `<div class="mui-panel member"><member-indiv uid="${membersId}"></member-indiv></div>`)
                .join('');

            this.innerHTML = `
                <div class="header mui--text-headline">Members</div>
                <div class="mui-divider"></div>
                <br />${list}`;
        }
    });
})();
