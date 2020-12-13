define(['text!components/templates/taskScheduleChip.html','filters/scheduleFilter'],
(template, scheduleFilter) => {
    return Vue.extend({
        template,
        props: ['task'],
        filters: {
            scheduleFilter
        }
    });
});