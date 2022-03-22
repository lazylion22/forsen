google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
var mute = 0
var audio = new Audio('notify.mp3');
var streamer = "forsen"
var first = 0
var showData1 = 1

function capStr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
document.title = "doubters?"

function drawChart() {

    var data = new google.visualization.DataTable();

    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Percentage');


    var options = {
        title: capStr(streamer) + ' Jump King Progress',
        width: 1200,
        height: 500,
        focusTarget: 'category',
        crosshair: { orientation: 'vertical', trigger: 'focus' },
        hAxis: {
            format: 'HH:mm:ss',
            gridlines: { count: 10 }
        },
        vAxis: {
            gridlines: { color: 'none' },
            minValue: 0
        }
    };


    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);


    var per = 0
    async function fetchData() {


        const res = await fetch('https://forsenjk-default-rtdb.firebaseio.com/' + streamer + '/last.json')

        const jfile = await res.json()
        per = jfile.percent
        nowDate = new Date()
        jDate = new Date(parseInt(jfile.mstime))

        data.addRows([
            [jDate, parseInt(jfile.percent)]
        ])
        if (showData1 == 1) { chart.draw(data, options); }


        // console.log(jfile.mstime)
    }



    // Number from 0.0 to 1.0



}