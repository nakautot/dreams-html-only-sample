(function () {
    customElements.define('member-detail', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
            this.refreshView = this.refreshView.bind(this);
        }

        connectedCallback() {
            window.addEventListener('change-member', this.refreshView);
            window.addEventListener('change-sprint', this.refreshView);
        }

        disconnectedCallback() {
            window.removeEventListener('change-member', this.refreshView);
            window.removeEventListener('change-sprint', this.refreshView);
            super.disconnectedCallback && super.disconnectedCallback();
        }

        refreshView() {  
            this.getModel();
        }

        async getModel() {
            let selectedMember = this._model.getSelectedMember();
            let member = await this._model.getById(selectedMember);
            if(!member) return;

            let currentSprint = await API.models.sprint.currentSprint();
            let sprintid = API.models.sprint.getSelectedSprint() || currentSprint;
            let sprint = await API.models.sprint.getById(sprintid);            

            let allStories = await API.models.story.getAllStoriesWithDetails(sprintid);
            let allDefects = await API.models.story.getAllDefectsWithDetails(sprintid);
            let allSupport = await API.models.story.getAllSupportWithDetails(sprintid);
            let allTests = await API.models.story.getAllTests(sprintid);
            let allRCAs = await API.models.story.getAllRCA(sprintid);
            let allTCs = await API.models.story.getAllTC(sprintid);
            this.renderPosts({member, sprint, allStories, allDefects, allSupport, allTests, allRCAs, allTCs});
        }

        renderPosts({member, sprint, allStories, allDefects, allSupport, allTests, allRCAs, allTCs}) {
            const getPercent = (num, denum) => `${(((num.length / denum.length) || 0) * 100).toFixed(0)}%`;
            const sum = arr => ({length: arr.map(m => m.length).reduce((p, c) => p + c, 0)});
            
            let onlyStories = API.helpers.sprint.getMemberTotal(member.id, allStories, 3);
            let onlyDefects = API.helpers.sprint.getMemberTotal(member.id, allDefects, 3);
            let onlySupport = API.helpers.sprint.getMemberTotal(member.id, allSupport, 3);
            let onlyTests = allTests.filter(m => m == member.id);
            let onlyRCAs = allRCAs.filter(m => m == member.id);
            let onlyTCs = allTCs.filter(m => m == member.id);
            let allNums = sum([onlyStories, onlyDefects, onlySupport, onlyTests, onlyTCs, onlyRCAs]);
            let allDenums = sum([allStories, allDefects, allSupport, allTests, allTCs, allRCAs]);

            let info = [[{
                label: '# of Stories:',
                value: onlyStories.length
            }, {
                label: '# of Defects:',
                value: onlyDefects.length
            }, {
                label: '# of Support:',
                value: onlySupport.length
            }, {
                label: '# of Tests:',
                value: onlyTests.length
            }, {
                label: '# of T.Cases:',
                value: onlyTCs.length
            }, {
                label: '# of RCAs:',
                value: onlyRCAs.length
            }],[{
                label: 'Story Contribution:',
                value: getPercent(onlyStories, allStories)
            }, {
                label: 'Fixing Contribution:',
                value: getPercent(onlyDefects, allDefects)
            }, {
                label: 'Support Contribution:',
                value: getPercent(onlySupport, allSupport)
            }, {
                label: 'Testing Contribution:',
                value: getPercent(onlyTests, allTests)
            }, {
                label: 'T.Case Contribution:',
                value: getPercent(onlyTCs, allTCs)
            }, {
                label: 'RCA Contribution:',
                value: getPercent(onlyRCAs, allRCAs)
            }], [{}], [{
                label: 'TEAM Contribution:',
                value: getPercent(allNums, allDenums)
            }]].map(m => m.map(n => `<div class="mui-col-md-2"><b>${n.label || '&nbsp;'} </b>${n.value || '&nbsp;'}</div>`).join(''))
            .join('</div><div class="mui-row">')
            

            this.innerHTML = `
                <div class="header mui--text-headline"><member-img uid="${member.id}" width="25" height="25"></member-img> ${member.username.toUpperCase()}'s stats for ${sprint.name}</div>
                <div class="mui-divider"></div>
                <br />
                <div class="mui-container-fluid"><div class="mui-row">${info}</div></div>`;
        }
    });
})();
