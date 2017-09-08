window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            processes: []
        }
    },
    mounted() {
        
    },
    methods: {
        onSelectProcessClick() {
            axios.get('/getleadtime', {
            })
                .then((response) => {
                    this.processes = response.data;
                    this.processes = this.processes.map(function (process) {
                        return {
                            id: process.USR_ID,
                            processName: process.PROC_NM,
                            stDt: moment(process.ST_DT).format("YYYY.MM.DD HH:mm"),
                            endDt: moment(process.END_DT).format("YYYY.MM.DD HH:mm"),
                            leadTime: process.LD_TM + " (day)",
                            timeStamp: moment(process.CRE_DT).format("YYYY.MM.DD HH:mm")
                        };
                    });
                })
        }
    },
});

