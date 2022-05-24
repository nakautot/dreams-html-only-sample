(function () {
    let tmpl = document.createElement('template');    

    customElements.define('sprint-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let shadowRoot = this.attachShadow({mode: 'open'});
            let name = this.attributes.name.value;
            let icon = this.attributes.icon.value;

            tmpl.innerHTML = `
                <span>
                    <b>${name}</b> <span>${icon}</span>
                </span>
            `;
        
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
