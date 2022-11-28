(function () {
    customElements.define('badge-icon', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.badge;
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            await this._model.fetch();            
            this.renderPosts({uid});
        }

        renderPosts({uid}) {            
            let badge = this._model.badgeDict[uid];
            if(!badge) return;
            this.innerHTML = `<span title="${badge.badge}: ${badge.description}">${badge.icon}</span>`;
        }
    });
})();
