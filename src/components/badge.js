(function () {
    let tmpl = document.createElement('template');    

    customElements.define('badge-icon', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            await API.models.badge.fetch();            
            this.renderPosts({uid});
        }

        renderPosts({uid}) {            
            console.log(uid)
            console.log(API.models.badge.badgeDict[uid])
            let badge = API.models.badge.badgeDict[uid];
            this.innerHTML = `<span title="${badge.badge}: ${badge.description}">${badge.icon}</span>`;
        }
    });
})();
