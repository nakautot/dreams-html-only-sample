(function () {
    customElements.define('member-img', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            let member = await this._model.getById(uid);      
            this.renderPosts({member});
        }

        renderPosts({member}) {
            let width = this.attributes.width.value;
            let height = this.attributes.height.value;

            this.innerHTML = `<img src="https://github.com/${member.username}.png?size=80" width="${width}" height="${height}" alt="${member.username}" title="${member.username}">`;
        }
    });
})();
