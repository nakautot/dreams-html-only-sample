(function () {
    let tmpl = document.createElement('template');    

    customElements.define('story-indiv', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            this.getModel({uid});
        }

        async getModel({uid}) {
            let story = await API.models.story.getById(uid);            
            this.renderPosts({story});
        }

        renderPosts({story}) {
            this.innerHTML = `
                <div class="mui-panel story">
                    <div class="mui-container-fluid">
                        <div class="mui-row">
                            <div class="mui-col-md-6">
                                <div class="story-icon">${story.icon}</div>
                                <div class="mui--text-subhead"><a href="https://frontlinetechnologies.atlassian.net/browse/${story.ticket}">${story.ticket}</a></div>                                
                            </div>
                            <div class="mui-col-md-6">test</div>                            
                        </div>
                    </div>
                </div>
            `;
        }
    });
})();
