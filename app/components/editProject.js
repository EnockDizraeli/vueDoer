define(['text!components/templates/editProject.html','text!json/projectColors.json','store/index'],
(template, projectColors, store) => {
    projectColors = JSON.parse( projectColors );

    return Vue.extend({
        template,
        props: ['project'],
        data() {
            return {
                formValid: false,
                showingDialog: false,
                name: '',
                color: '',
                projectColors,
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                colorRules: [
                    v => !!v || 'Color is required'
                ]
            }
        },
        methods: {
            editProject(){
                this.dispatchToStore();
                showSnackbar("Project updated.");
            },
            dispatchToStore(){
                let project = JSON.parse( JSON.stringify(this.project) );
                project.name = this.name;
                project.color = this.color;
                store.dispatch('projects/update', project);
            }
        },
        created(){
            this.name = this.project.name;
            this.color = this.project.color;
        }
    });
});