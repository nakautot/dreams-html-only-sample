
customElements.define('plm-file', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let uid = this.attributes.uid.value;
    }

    renderPosts({uid}) {   
            console.log(uid)
        this.innerHTML = "WHWHWHWHWHW";
    }
});