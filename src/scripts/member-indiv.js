(function () {
    let tmpl = document.createElement('template');    

    customElements.define('member-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.getModel();
        }

        async getModel() {
            let badgeDict = await API.getBadgeDict();
            let currentSprint = await API.currentSprint();
            let memberBadge = await API.read("/dreams-html-only-sample/src/data/member-badge.json");            
            this.renderPosts({badgeDict, memberBadge, currentSprint});
        }

        renderPosts({badgeDict, memberBadge, currentSprint}) {
            let shadowRoot = this.attachShadow({mode: 'open'});
            let username = this.attributes.username.value;
            let uid = this.attributes.uid.value;
            
            let currbadges = memberBadge
                .filter(m => m.memberid == uid)
                .filter(m => !m.sprintid || m.sprintid == currentSprint)
                .map(m => badgeDict[m.badgeid])
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
