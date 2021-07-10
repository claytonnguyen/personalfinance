import React, {useState, useEffect } from 'react';
import './App.css';
import Tax from './Tax';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';

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
    <>
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand href="#home" >
        <img
          alt=""
          src="/logo.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Personal Finance
      </Navbar.Brand>
    </Navbar>
    <div className="App">
      <div className="Dashboard">
        <div className="Form">
          {console.log(annual)}
          <Card style={{ width: '25rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item><label htmlFor="initial">Initial Deposit: ${initial} </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="initial" placeholder="10000, etc" onChange={(e) => setInitial(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="contribution">Contribution: ${contribution} </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="contribution" placeholder="1000, etc" onChange={(e) => setContribution(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="contributionTime">Contribute: {contributionTime ? 'Annually' : 'Monthly'} </label>
              <Button type="button" className="btn btn-primary pad-btn" onClick={() => setContributionTime(current => !current)} >Change</Button>
              </ListGroup.Item>
              <ListGroup.Item><label htmlFor="years">Years Invested: {years} years</label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="years" placeholder="10, etc" onChange={(e) => setYears(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="rate">Investment rate: {Math.round(rate * 100)}% </label></ListGroup.Item>
              <ListGroup.Item><input type="text" name="rate" placeholder="0.07, etc" onChange={(e) => setRate(Number(e.target.value))} ></input></ListGroup.Item>
              <ListGroup.Item><label htmlFor="annual">Compounded: {annual ? 'Annually' : 'Monthly'} </label>
              <Button type="button" className="btn btn-primary pad-btn" onClick={() => setAnnual(current => !current)} >Change</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div> 
        <div className="Line-Graph">
          <h1>Compound Interest Calculator</h1>
          <br></br>
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
          <h5>{annual ? 'Years' : 'Months'}</h5>
        </div>
      </div>
      <div className="capitalTax">
        <Tax />
      </div>
    </div>
    </>
  );
}

export default App;
