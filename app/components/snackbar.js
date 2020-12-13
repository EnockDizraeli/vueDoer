define(['text!components/templates/snackbar.html'], 
(template) => {
    return Vue.extend({
        template,
        data() {
            return {
                snackbar: false,
                text: ''
            }
        },
        methods: {
            show(text){
                this.text = text;
                this.snackbar = true;
            }
        },
    });
});