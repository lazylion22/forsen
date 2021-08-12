      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('datetime', 'Time of Day');
        data.addColumn('number', 'Progress');



        var options = {
          title: 'Forsen Jump King Progress',
          width: 900,
          height: 500,
          hAxis: {
            format: 'HH:mm:ss',
            gridlines: {count: 10}
          },
          vAxis: {
            gridlines: {color: 'none'},
            minValue: 0
          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);

        
         function addData(timeinMS,percent) {

          // If the format option matches, change it to the new option,

          chart.draw(data);
          
        };

        // var addData_btn = document.getElementById('addData');
        // addData_btn.onclick = function () {
          
          
        // }
        async function fetchData() {

        
          const res = await fetch('https://forsenjk-default-rtdb.firebaseio.com/forsen/last.json')

          const jfile = await res.json()
          data.addRows([[ new Date(parseInt(jfile.mstime)),parseInt(jfile.percent)]])
          chart.draw(data,options);

          // console.log(jfile.mstime)
          }
          var bar = new ProgressBar.Circle(container, {
            strokeWidth: 6,
            duration: 10000,
            easing: 'linear',
            color: '#4169E1',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: null
          });

            // Number from 0.0 to 1.0
          var x = setInterval(function() {
            bar.set(0)
            bar.animate(1.0);
            fetchData()
            console.log("ok")
          }, 10000);
          fetchData()
          
          bar.animate(1.0);
}
