window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            cumulatives: []
        }
    },
    methods: {
        onShowResultClick() {
            axios.get('/getCfdTable', {
            }).then((response) => {
                this.cumulatives = response.data.map(function (cumulative) {
                    return {
                        id: cumulative.id,
                        cfdName: cumulative.cfdName,
                        processName: cumulative.processName,
                        seq: cumulative.seq,
                        lowerBound: cumulative.lowerBound,
                        upperBound: cumulative.upperBound,
                        frequency: cumulative.frequency,
                        cumuFrequency: cumulative.cumuFrequency,
                        percentage: cumulative.percentage + '%',
                        level: cumulative.level + ' Level',
                        stDt: moment(cumulative.stDt).format("YYYY.MM.DD"),
                        endDt: moment(cumulative.endDt).format("YYYY.MM.DD")
                    };
                })
            })
        },
    }

});