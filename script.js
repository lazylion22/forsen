      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      var mute = 0
      var audio = new Audio('notify.mp3');
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
        var per = 0
        async function fetchData() {

        
          const res = await fetch('https://forsenjk-default-rtdb.firebaseio.com/forsen/last.json')

          const jfile = await res.json()
          per = jfile.percent
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
            var notify= document.getElementById('textbox').value


            // console.log(notify)
            // console.log(per)
            // console.log(notify < per)
              if(notify < per){
                if(mute==0){
                  
                  audio.play();
                }
                
                // console.log("nice!")
              
            }
          }, 10000);
          fetchData()
          
          bar.animate(1.0);
}
var mutebutton = document.getElementById('mute');
mutebutton.onclick = function () {
  if(mute == 1){
    mutebutton.innerText ="mute"
    mute = 0
    audio.muted = false;
  }
  else{
    mutebutton.innerText ="unmute"
    mute = 1
    audio.muted = true;
  }
}