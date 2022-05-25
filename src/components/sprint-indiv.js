(function () {
    let tmpl = document.createElement('template');    

    customElements.define('sprint-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            let sprint = await API.models.sprint.getById(uid);
            let currentSprint = await API.models.sprint.currentSprint();
            this.renderPosts({sprint, currentSprint});
        }

        renderPosts({sprint, currentSprint}) {
            let shadowRoot = this.attachShadow({mode: 'open'});

            tmpl.innerHTML = `
                <span>
                    <b>${sprint.name}</b> ${sprint.id == currentSprint ? '<badge-icon uid="6"></badge-icon>' : ''}
                </span>
            `;
        
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
