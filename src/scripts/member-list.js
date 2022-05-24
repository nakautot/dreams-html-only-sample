(function () {
    /*tmpl.innerHTML = `
        <style>:host { ... }</style> <!-- look ma, scoped styles -->
        <b>I'm in shadow dom!</b>
        <slot></slot>
    `;*/

    customElements.define('member-list', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let members = await API.read("/dreams-html-only-sample/src/data/members.json");
            this.renderPosts(members);
        }

        renderPosts(members) {
            var mclass = this.attributes.mclass?.value || '';

            this.innerHTML = members.map(member => `<div class="mui-panel ${mclass}"><member-indiv username="${member.username}" issenior="${member.issenior || ''}"></member-indiv></div>`).join('');
        }
    });
})();
