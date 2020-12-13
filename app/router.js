define(['pages/inbox','pages/today','pages/project','pages/task','pages/week'],
(inbox, today, project, task, week) => {

    let inboxRoute = {
        name: 'inbox',
        path: '/inbox',
        component: inbox,
        children: [{
            path: '/inbox/task/:taskID',
            component: task
        }]
    };

    let todayRoute = {
        name: 'today',
        path: '/today',
        component: today,
        children: [{
            path: '/today/task/:taskID',
            component: task
        }]
    };


    let weekRoute = {
        name: 'week',
        path: '/week',
        component: week,
        children: [{
            path: '/week/task/:taskID',
            component: task
        }]
    };

    let projectRoute = {
        name: 'project',
        path: '/project/:id',
        component: project,
        children: [{
            path: '/project/:id/task/:taskID',
            component: task
        }]
    };

    let fallbackRoute = {
        path: '*',
        redirect: '/inbox'
    };

    let routes = [
        inboxRoute,
        todayRoute,
        weekRoute,
        projectRoute,
        fallbackRoute
    ];

    const router = new VueRouter({
        routes
    });

    return router;
});