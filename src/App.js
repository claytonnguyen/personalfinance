import './App.css';
import { Line } from 'react-chartjs-2';

function compoundInterest(initial, months, rate) {
  const results = [];
  var total = initial;
  var interest = 0;
  results.push(total);
  for (let i = 0; i < months; i++) {
    interest = total * rate;
    total += interest;
    results.push(total);
  }
  return results;
}

function labelArray(stats) {
  const length = stats.length;
  const results = [];
  for (let i = 0; i < length; i++) {
    results.push(i);
  }
  return results;
}

const stats = compoundInterest(5000, 60, 0.075);

const months = labelArray(stats);

const state = {
  labels: months,
  datasets: [
    {
      label: 'Compound Interest',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: stats
    }
  ]
}

function App() {
  
  return (
    <div className="App">
      <div className="Dashboard">
        <div className="Line-Graph">
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
