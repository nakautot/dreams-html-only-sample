(function () {
    customElements.define('member-detail', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            window.addEventListener('change-member', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('change-member', this.refreshView);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        refreshView() {  
            this.getModel();
        }

        async getModel() {
            await this._model.fetch();            
            this.renderPosts();
        }

        renderPosts() {            
            this.innerHTML = `
                <div class="header mui--text-headline">Member Details: </div>
                <div class="mui-divider"></div>
                <br />
                <div>WORK IN PROGRESS</div>`;
        }
    });
})();
