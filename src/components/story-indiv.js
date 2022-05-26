(function () {
    customElements.define('story-indiv', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.story;
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;            
            this.getModel({uid});
        }        

        async getModel({uid}) {
            let story = await this._model.getById(uid);            
            this.renderPosts({story});
        }

        renderPosts({story}) {
            let tasks = (story.members || []).map(m => `<task-indiv model='${JSON.stringify(m)}'></task-indiv>`).join('<div class="mui-divider"></div>');
            this.innerHTML = `
                <div class="mui-panel story mui--align-top">
                    <div class="mui-container-fluid">
                        <div class="mui-row">
                            <div class="mui-col-md-6">
                                <badge-icon class="story-icon" uid="${story.icon}"></badge-icon>
                                <div class="mui--text-subhead"><a target="_blank" href="https://frontlinetechnologies.atlassian.net/browse/${story.ticket}">${story.ticket}</a></div>                                
                            </div>
                            <div class="mui-col-md-6 tasks mui--text-right">${tasks}</div>
                        </div>
                        <div class="mui-row">
                            <div class="mui-col-md-12 story-title">
                            ${story.title}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
})();
