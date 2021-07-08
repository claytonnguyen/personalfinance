import React, {useState, useEffect } from 'react';
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

let stats = [];


function App() {
  const [state, setState] = useState();

  const [initial, setInitial] = useState(0);
  const [months, setMonths] = useState(0);
  const [rate, setRate] = useState(0);
  const [annual, setAnnual] = useState("hi");

  useEffect(() => {
    stats = compoundInterest(initial, months, rate);
    let count = labelArray(stats);
    let data = {
      labels: count,
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
    setState(data);
  }, [initial, months, rate]);

  return (
    <div className="App">
      <div className="Dashboard">
        <div className="Form">
          <div>
            <label htmlFor="initial">Initial Deposit: {initial} </label>
            <input type="text" name="initial" onChange={(e) => setInitial(Number(e.target.value))} ></input>
            <label htmlFor="months">Months Invested: {months} </label>
            <input type="text" name="months" onChange={(e) => setMonths(Number(e.target.value))} ></input>
            <label htmlFor="rate">Investment rate: {rate} </label>
            <input type="text" name="rate" onChange={(e) => setRate(Number(e.target.value))} ></input>
            <label htmlFor="annual">Compounded: {annual} </label>
            <input type="text" name="annual" onChange={(e) => setAnnual(e.target.value)} ></input>
          </div>
        </div>
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
