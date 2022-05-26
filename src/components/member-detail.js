(function () {
    customElements.define('member-detail', class extends HTMLElement {
        constructor() {
            super();
            this._model = API.models.member;
            this._helper = API.helpers.sprint;
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
            
            let memberBadge = await API.models.memberBadge.getById(member.id, sprintid);
            if(memberBadge.some(m => m.badgeid == 5)) return;

            let allStories = await API.models.story.getAllStoriesWithDetails(sprintid);
            let allDefects = await API.models.story.getAllDefectsWithDetails(sprintid);
            let allSupport = await API.models.story.getAllSupportWithDetails(sprintid);
            let allTests = await API.models.story.getAllTests(sprintid);
            let allRCAs = await API.models.story.getAllRCA(sprintid);
            let allTCs = await API.models.story.getAllTC(sprintid);

            let mostStories = await API.models.story.getMostStories(sprintid);
            let mostDefects = await API.models.story.getMostDefects(sprintid);
            let mostSupport = await API.models.story.getMostSupport(sprintid);
            let mostTested = await API.models.story.getMostTested(sprintid);
            let mostTCCreated = await API.models.story.getMostTCCreated(sprintid);
            let mostRCAed = await API.models.story.getMostRCA(sprintid);            
            
            this.renderPosts({member, memberBadge, sprint, allStories, allDefects, allSupport, allTests, allRCAs, allTCs, mostStories, mostDefects, mostSupport, mostTested, mostTCCreated, mostRCAed});
        }

        renderPosts({member, memberBadge, sprint, allStories, allDefects, allSupport, allTests, allRCAs, allTCs, mostStories, mostDefects, mostSupport, mostTested, mostTCCreated, mostRCAed}) {
            const getPercent = (num, denum) => `${(((num.length / denum.length) || 0) * 100).toFixed(0)}%`;
            const sum = arr => ({length: arr.map(m => m.length).reduce((p, c) => p + c, 0)});
            const clean = arr => arr
                .map(m => m
                    .map(n => `<div class="mui-col-md-2"><b>${n.label || '&nbsp;'} </b>${n.value || n.value == 0 ? n.value : '&nbsp;'}</div>`)
                    .join(''))
                .join('</div><div class="mui-row">');
            
            let onlyStories = API.helpers.sprint.getMemberTotal(member.id, allStories, 3);
            let onlyDefects = API.helpers.sprint.getMemberTotal(member.id, allDefects, 3);
            let onlySupport = API.helpers.sprint.getMemberTotal(member.id, allSupport, 3);

            let onlyTests = allTests.filter(m => m == member.id);
            let onlyRCAs = allRCAs.filter(m => m == member.id);
            let onlyTCs = allTCs.filter(m => m == member.id);

            let allNums = sum([onlyStories, onlyDefects, onlySupport, onlyTests, onlyTCs, onlyRCAs]);
            let allDenums = sum([allStories, allDefects, allSupport, allTests, allTCs, allRCAs]);

            let achievements = [];
            if(mostStories.some(m => m == member.id)) achievements.push('<badge-icon uid="14"></badge-icon> Most Stories Completed!');
            if(mostDefects.some(m => m == member.id)) achievements.push('<badge-icon uid="11"></badge-icon> Most Defects Fixed!');
            if(mostSupport.some(m => m == member.id)) achievements.push('<badge-icon uid="15"></badge-icon> Most Support Request Completed!');
            if(mostTested.some(m => m == member.id)) achievements.push('<badge-icon uid="2"></badge-icon> Most Tests Performed!');
            if(mostTCCreated.some(m => m == member.id)) achievements.push('<badge-icon uid="8"></badge-icon> Most Test Cases Created!');
            if(mostRCAed.some(m => m == member.id)) achievements.push('<badge-icon uid="7"></badge-icon> Most Root Causes Analyzed!');            

            let myAchievements = achievements.join('&nbsp;<span class="mui--divider-left">&nbsp;');

            let info1 = [[{
                label: 'TEAM Contribution:',
                value: `<b>${getPercent(allNums, allDenums)}</b>`
            }, {
                label: 'Roles/Assigments:',
                value: memberBadge.map(m => `<badge-icon uid="${m.badgeid}"></badge-icon>`).join('')
            }], [{}]];

            let info2 = `<div class="mui-col-md-12"><b>Achievement(s):</b> ${myAchievements || 'n/a'}</div>`;
            
            let info3 = [[{}], [{
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
            }]];
            
            let info = [clean(info1), info2, clean(info3)].join('</div><div class="mui-row">');

            this.innerHTML = `
                <div class="header mui--text-headline"><member-img uid="${member.id}" width="25" height="25"></member-img> ${member.username.toUpperCase()}'s stats for ${sprint.name}</div>
                <div class="mui-divider"></div>
                <br />
                <div class="mui-container-fluid"><div class="mui-row">${info}</div></div>`;
        }
    });
})();
