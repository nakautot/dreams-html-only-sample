(function () {
    customElements.define('plm-file', class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let uid = this.attributes.uid.value;
            let token = this.attributes.token.value;
            let action = this.attributes.callback.value;
            this.renderPosts({uid,token,action});
            this._dataUid = uid;
        }

        get value() {
            return document.querySelector(`#step-${this._dataUid} #urlx`).value;
        }

        renderPosts({uid, token, action}) {
            var that = this;
            this.innerHTML = `
            <dialog id="step-${uid}">
                <p>Sample internal picker</p>
                <br/>
                <div>id</div>
                <div><input type="text" id="RemoteSysID" value="1245"/></div>
                <div>title</div>
                <div><input type="text" id="Title" value="super"/></div>
                <div>description</div>
                <div><input type="text" id="Description" value="mario"/></div>
                <div>RLResource</div>
                <div><input type="text" id="RLResource" value="false"/></div>
                <div>Thumbnail</div>
                <div><input type="text" id="Thumbnail" value="brothers"/></div>
                <div><input type="hidden" id="urlx" value=""/></div>
                <br/>
                <br/>
                <button id="sub" onclick="window.pickStepArtifact${uid}(); return false;">Apply</button>
                <button id="sub" onclick="window.close${uid}(); return false;">Close</button>
            </dialog>`;
            window[`close${uid}`] = function () {
                document.getElementById(`step-${uid}`).close();
            }
            window[`pickStepArtifact${uid}`] = function () {
                var RemoteSysID = document.querySelector(`#step-${uid} #RemoteSysID`).value;
                var Title = document.querySelector(`#step-${uid} #Title`).value;
                var Description = document.querySelector(`#step-${uid} #Description`).value;
                var RLResource = document.querySelector(`#step-${uid} #RLResource`).value;
                var Thumbnail = document.querySelector(`#step-${uid} #Thumbnail`).value;

                fetch(`${action}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify({RemoteSysID,Title,Description,RLResource,Thumbnail})
                })
                .then(function(response){ return response.json() })
                .then(function(response){ 
                    document.querySelector(`#step-${uid} #urlx`).value = response.url;
                    that.dispatchEvent(new Event('change'));
                })
            }
        }
    });
})();