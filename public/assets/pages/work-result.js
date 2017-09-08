window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            image: ""
        }
    }, 
    mounted() {
        this.onChangeRadio() 
    },
    methods: {
        onChangeRadio() {
            $("#img").html('');
            switch (this.image) {
                case "1":
                    $("#img").append("<img src=\"/assets/img/golf_ok.gif\">");
                    break;
                case "2":
                    $("#img").append("<img src=\"/assets/img/golf.gif\">");
                    break;
                case "3":
                    $("#img").append("<img src=\"/assets/img/outofgoal.gif\">");
                    break;
                default:
                    $("#img").html("");
            }
        }
    }
});
