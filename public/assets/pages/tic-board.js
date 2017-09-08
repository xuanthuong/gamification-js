window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            image: ""
        }
    },
    mounted() {
        this.showBarChart();
        this.showColumnChart();
    },
    methods: {
        showBarChart() {
            dataColouredBarsChart = {
                labels: ['\'AM 09', '\'AM 10', '\'AM 11', '\'AM 12', '\'PM 01', '\'PM 02', '\'PM 03', '\'PM 04', '\'PM 05', '\'PM 06'],
                series: [
                    { "name": "Me", "data": [3000, 3200, 3254, 3954, 4875, 4987, 5241, 5524, 7240, 8000, 9884] },
                    { "name": "Member Avg.", "data": [870, 1001, 2650, 3500, 4221, 4700, 5100, 5301, 6945, 7500, 8412] }
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
                high: 10000,
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