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
            await API.models.badge.fetch();
            let sprint = await API.models.sprint.getById(uid);
            let currentSprint = await API.models.sprint.currentSprint();
            this.renderPosts({sprint, currentSprint});
        }

        renderPosts({sprint, currentSprint}) {
            let shadowRoot = this.attachShadow({mode: 'open'});

            tmpl.innerHTML = `
                <span>
                    <b>${sprint.name}</b> <span>${sprint.id == currentSprint ? API.models.badge.badgeDict[6].icon : ''}</span>
                </span>
            `;
        
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
