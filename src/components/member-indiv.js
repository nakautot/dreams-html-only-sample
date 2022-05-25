(function () {
    let tmpl = document.createElement('template');    

    customElements.define('member-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            await API.models.badge.fetch();
            let currentSprint = await API.models.sprint.currentSprint();
            let memberBadge = await API.models.memberBadge.getById(uid, currentSprint);
            let member = await API.models.member.getById(uid);
            this.renderPosts({memberBadge, member});
        }

        renderPosts({memberBadge, member: {username}}) {
            let shadowRoot = this.attachShadow({mode: 'open'});
            
            let currbadges = memberBadge
                .map(m => API.models.badge.badgeDict[m.badgeid])
                .map(m => `<span title="${m.badge}: ${m.description}">${m.icon}</span>`)
                .join('');

            tmpl.innerHTML = `
                <style>.badges {text-align: right; cursor: context-menu;}</style>
                <span>
                    <div><img src="https://github.com/${username}.png?size=80" width="80" height="80" alt="nakautot"></div>
                    <div>${username}</div>
                    <hr/>
                    <div class="badges">&nbsp;${currbadges}</div>
                </span>
            `;
        
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
