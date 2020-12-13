define(['text!components/templates/listOfProjects.html'],
(template) => {
    return Vue.extend({
        template,
        props: ['projects']
    });
});