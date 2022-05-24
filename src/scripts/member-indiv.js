(function () {
    let tmpl = document.createElement('template');    

    customElements.define('member-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let shadowRoot = this.attachShadow({mode: 'open'});
            let username = this.attributes.username.value;
            let issenior = this.attributes.issenior.value;

            tmpl.innerHTML = `
                <style>:host { ... }</style> <!-- look ma, scoped styles -->
                <span>
                    <div><img src="https://github.com/${username}.png?size=80" width="80" height="80" alt="nakautot"></div>
                    <div>${issenior?'⭐':''}${username}</div>
                </span>
            `;
        
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
