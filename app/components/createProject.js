define(['text!components/templates/createProject.html','mixins/snackbar','text!json/projectColors.json','store/index'],
(template, snackbar, projectColors, store) => {

    projectColors = JSON.parse(projectColors);

    return Vue.extend({
        template,
        mixins: [snackbar],
        data() {
            return {
                formValid: false,
                showingDialog: false,
                name: '',
                color: '',
                projectColors,

                nameRules: [
                    v => !!v || 'Name is required'
                ],
                colorRules: [
                    v => !!v || 'Color is required'
                ]
            }
        },
        methods: {
            createProject(){
                let project = {
                    name: this.name,
                    color: this.color
                };
                store.dispatch('projects/create', project);
                this.reset();
                showSnackbar('Project created');
                this.hide();
            },
            reset(){
                this.name = '';
                this.color  = '';
                
                this.$refs.form.resetValidation();
            },
            hide(){
                this.showingDialog = false;
            }
        },
    });
});