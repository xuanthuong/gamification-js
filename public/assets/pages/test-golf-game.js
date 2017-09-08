window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            optionPar: "Par3",
            user: "All",
            type: "All",
            currentLv1: 1,
            currentLv2: 2,
            currentLv3: 3,
            currentLv4: 4,
            currentLv5: 5,
            currentLv6: 6,
            currentLv7: 7,
            currentLv8: 8,
            currentLv9: 9,
            currentLv10: 10,
            shots: [],
            holeScore: 0,
            tablelength: 0
        }
    },
    mounted() {
    },
    methods: {
        userChange() {
            axios.post('/api/getLevels', {
                username: this.user
            }).then((response) => {
                for (let i = 0; i < response.data.levels.length; i++) {
                    switch (i) {
                        case 0:
                            this.currentLv1 = response.data.levels[i];
                            break;
                        case 1:
                            this.currentLv2 = response.data.levels[i];
                            break;
                        case 2:
                            this.currentLv3 = response.data.levels[i];
                            break;
                        case 3:
                            this.currentLv4 = response.data.levels[i];
                            break;
                        case 4:
                            this.currentLv5 = response.data.levels[i];
                            break;
                        case 5:
                            this.currentLv6 = response.data.levels[i];
                            break;
                        case 6:
                            this.currentLv7 = response.data.levels[i];
                            break;
                        case 7:
                            this.currentLv8 = response.data.levels[i];
                            break;
                        case 8:
                            this.currentLv9 = response.data.levels[i];
                            break;
                        case 9:
                            this.currentLv10 = response.data.levels[i];
                            break;
                    }
                }
            })
        },
        playgame() {
            let shotarr = [];
            axios.post('/api/getPlayGame', {
                hole: this.optionPar,
                username: this.user,
                type: this.type
            }).then((response) => {
                for (let i = 0; i < response.data.Shot.length; i++) {
                    shotarr.push({
                        id: i + 1,
                        distance: response.data.Shot[i].distance,
                        toLocation: response.data.Shot[i].toLocation,
                        action: response.data.Shot[i].action
                    });
                }
                this.tablelength = response.data.Shot.length;
                this.shots = shotarr;
                this.holeScore = response.data.HoleScore;
            });
        },
        tableClick(action, toLocation) {
            $.getJSON("/animation.json", (data) => {
                $("#img").html('');
                let image = data[this.optionPar][action][toLocation];
                if (image) {
                    $("#img").append("<img src=\"/assets/img/test-golf-game/" + image + "\">");
                } else {
                    $("#img").html("");
                }
            });

        }
    }
});
