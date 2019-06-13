var speedArray = [];

function getCurrentFormattedDate() {
    let date = new Date();
    let formattedDate = date.getHours() + ":" + date.getMinutes();
    return formattedDate;
}

function automateSpeedGauge() {
    setInterval(function () {
        let value = randomNumberFromRange(0, 80);

        speedArray.push({ "speed": value, "time": getCurrentFormattedDate() });

        $(".gauge-speed").attr("data-value", value);
        $(".gauge-gps-speed").attr("data-value", value);
    }, 500);
}

function randomNumberFromRange(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

function plotSpeedChart() {
    let speedChartId = document.getElementById('chart_speed');

    let arraySpeed = [], arrayTime = [];
    if (speedArray.length > 0) {
        for (let i = 0; i < speedArray.length; i++) {
            arraySpeed.push(speedArray[i].speed);
            arrayTime.push(speedArray[i].time);
        }
    }

    if (arraySpeed.length > 2) {
        let speedChart = new Chart(speedChartId,
            {
                "type": "line",
                "data": {
                    "labels": arrayTime,
                    "datasets": [{
                        "showLegend": "false",
                        "label": "Speed",
                        "data": arraySpeed,
                        "fill": false,
                        "borderColor": "rgb(75, 192, 192)",
                        "lineTension": 0.1
                    }]
                }
            });
    }
}
