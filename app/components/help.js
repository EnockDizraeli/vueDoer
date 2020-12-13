define(['text!components/templates/help.html'],
(template) => {
    return Vue.extend({
        template,
        data() {
            return {
                dialog: false
            }
        },
    });
});