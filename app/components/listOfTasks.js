define(['text!components/templates/listOfTasks.html','components/task'],
(template, task) => {
    return Vue.extend({
        template,
        props: {
            tasks: {
                required: true,
            },
            projectChip: {
                default: false,
                required: false,
            },
            scheduleChip: {
                default: true,
                required: false,
            }
        },
        components: {
            task
        }
    });
});