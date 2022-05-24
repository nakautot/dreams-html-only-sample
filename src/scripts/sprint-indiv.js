(function () {
    let tmpl = document.createElement('template');    

    customElements.define('sprint-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let shadowRoot = this.attachShadow({mode: 'open'});
            let name = this.attributes.name.value;

            tmpl.innerHTML = `
                <span>
                    <b>${name}</b>
                </span>
            `;
        
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
