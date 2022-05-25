(function () {
    customElements.define('task-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let modelRaw = this.attributes.model.value;
            this.getModel({modelRaw});
        }

        async getModel({modelRaw}) {
            let model = JSON.parse(modelRaw);
            this.renderPosts({model});
        }

        renderPosts({model}) {
            this.innerHTML = `
                <badge-icon uid="${model.isdone ? '12' : '13'}"></badge-icon>&nbsp;
                <member-img uid="${model.id}" width="20" height="20"></member-img>&nbsp;
                <badge-icon uid="${model.badge}"></badge-icon>`;
        }
    });
})();
