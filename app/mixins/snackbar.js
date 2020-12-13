define([],
() => {
    return {
        data() {
            return {
                snackbar: false
            }
        },
        methods: {
            showSnackbar(){
                this.snackbar = true;
            },
            hideSnackbar(){
                this.snackbar = false;
            }
        },
    };
});