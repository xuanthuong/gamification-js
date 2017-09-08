window.app = new Vue({
    el: '#app',
    data: function () {
        return {

        }
    },
    mounted(){
        this.showBarChart();
        this.showColumnChart();
    },
    methods: {
        showBarChart() {
            dataColouredBarsChart = {
                labels: ['\'07/02', '\'07/13', '\'07/23', '\'08/15', '\'08/15'],
                series: [
                    { "name": "Me", "data": [100, 37.8, 57.6, 80, 99] }
                ]
            };
            optionsColouredBarsChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 10
                }),
                axisY: {
                    showGrid: true,
                    offset: 40
                },
                axisX: {
                    showGrid: false,
                },
                low: 0,
                high: 110,
                showPoint: true,
                height: '300px'
            };


            var colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart, optionsColouredBarsChart);

            md.startAnimationForLineChart(colouredBarsChart);
        },
        showColumnChart() {
            var dataMultipleBarsChart = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    { "name": "Me", "data": [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]},
                    { "name": "Member Avg.", "data": [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]}
                ]
            };

            var optionsMultipleBarsChart = {
                seriesBarDistance: 10,
                axisX: {
                    showGrid: false
                },
                height: '300px'
            };

            var responsiveOptionsMultipleBarsChart = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];

            var multipleBarsChart = Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart, optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);
            md.startAnimationForBarChart(multipleBarsChart);
        }
    }
});