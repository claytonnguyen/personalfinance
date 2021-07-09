import React, {useState, useEffect } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroup from 'react-bootstrap/ListGroup';

function compoundInterest(initial, years, rate, contribution, contributionTime, annual) {
  const results = [];
  var total = initial;
  var interest = 0;
  results.push(total);
  if (annual) {
    if (contributionTime) {
      for (let i = 0; i < years; i++) {
        interest = total * rate;
        {console.log(total)}
        total += contribution;
        {console.log(total)}
        total += interest;
        {console.log(total)}
        results.push(total);
      }
    } else {
      for (let i = 0; i < years; i++) {
        interest = total * rate;
        total += contribution * 12;
        total += interest;
        results.push(total);
      }
    }
  } else {
    if (contributionTime) {
      for (let i = 0; i < years * 12; i++) {
        interest = total * rate;
        total += contribution / 12;
        total += interest;
        results.push(total);
      }
    } else {
      for (let i = 0; i < years * 12; i++) {
        interest = total * rate;
        total += contribution;
        total += interest;
        results.push(total);
      }
    }
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
  const [years, setYears] = useState(0);
  const [rate, setRate] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [annual, setAnnual] = useState(true);
  const [contributionTime, setContributionTime] = useState(true);

  
  useEffect(() => {
    stats = compoundInterest(initial, years, rate, contribution, contributionTime, annual);
    let count = labelArray(stats);
    let data = {
      labels: count,
      datasets: [
        {
          label: 'Principal +  Interest',
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
  }, [initial, years, rate, contribution, contributionTime, annual]);

  return (
    <div className="App">
      <div className="Dashboard">
        <div className="Form">
          {console.log(annual)}
          <Card style={{ width: '25rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item><label htmlFor="initial">Initial Deposit: {initial} </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="initial" onChange={(e) => setInitial(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="contribution">Contribution: {contribution} </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="contribution" onChange={(e) => setContribution(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="contributionTime">Contribute: {contributionTime ? 'Annually' : 'Monthly'} </label>
              <Button type="button" class="btn btn-primary pad-btn" onClick={() => setContributionTime(current => !current)} >Change</Button>
              </ListGroup.Item>
              <ListGroup.Item><label htmlFor="years">Years Invested: {years} </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="years" onChange={(e) => setYears(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="rate">Investment rate: {rate} </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="rate" onChange={(e) => setRate(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="annual">Compounded: {annual ? 'Annually' : 'Monthly'} </label>
              <Button type="button" class="btn btn-primary pad-btn" onClick={() => setAnnual(current => !current)} >Change</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {/* <div>
            <label htmlFor="initial">Initial Deposit: {initial} </label>
            <input type="text" name="initial" onChange={(e) => setInitial(Number(e.target.value))} ></input>
            <label htmlFor="contribution">Contribution: {contribution} </label>
            <input type="text" name="contribution" onChange={(e) => setContribution(Number(e.target.value))} ></input>
            <label htmlFor="contributionTime">Contribute: {contributionTime ? 'Annually' : 'Monthly'} </label>
            <Button type="button" class="btn btn-primary" onClick={() => setContributionTime(current => !current)} >Change</Button>
            <label htmlFor="years">Years Invested: {years} </label>
            <input type="text" name="years" onChange={(e) => setYears(Number(e.target.value))} ></input>
            <label htmlFor="rate">Investment rate: {rate} </label>
            <input type="text" name="rate" onChange={(e) => setRate(Number(e.target.value))} ></input>
            <label htmlFor="annual">Compounded: {annual ? 'Annually' : 'Monthly'} </label>
            <Button type="button" class="btn btn-primary" onClick={() => setAnnual(current => !current)} >Change</Button>
          </div> */}
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
