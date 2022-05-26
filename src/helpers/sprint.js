(function () {
    API.helpers.sprint = {
        getMost (onlyTickets, badgeId) {
            let allTickets = onlyTickets
                .map(m => m.members.find(n => n.badge == badgeId)?.id)
                .filter(m => m);
            let msRaw = allTickets.reduce((p,c) => {
                p[c] = (p[c] || 0) + 1;
                return p;
            }, {});
            let maxTickets = (Math.max(...Object.keys(msRaw).map(m => msRaw[m])));
            
            return Object.keys(msRaw)
                .filter(m => msRaw[m] == maxTickets)
                .map(m => `<member-img uid="${m}" width="20" height="20"></member-img>`)
                .join('&nbsp;');
        }
    };    
})();