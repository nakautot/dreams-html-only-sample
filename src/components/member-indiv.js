(function () {
    customElements.define('member-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            let currentSprint = await API.models.sprint.currentSprint();
            let memberBadge = await API.models.memberBadge.getById(uid, currentSprint);
            let member = await API.models.member.getById(uid);
            this.renderPosts({memberBadge, member});
        }

        renderPosts({memberBadge, member: {username, id}}) {
            let currbadges = memberBadge
                .map(m => `<badge-icon uid="${m.badgeid}"></badge-icon>`)
                .join('');

            this.innerHTML = `
                <span>
                    <div><member-img uid="${id}" width="80" height="80"></member-img></div>
                    <div>${username}</div>
                    <div class="mui-divider"></div>
                    <div class="badges">&nbsp;${currbadges}</div>
                </span>
            `;
        }
    });
})();
