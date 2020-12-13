define(['text!components/templates/taskMenu.html','components/deleteTask','components/moveTask'],
(template, deleteTask, moveTask) => {
    return Vue.extend({
        template,
        props: ['task'],
        components: {
            deleteTask,
            moveTask
        }
    });
});