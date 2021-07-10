import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function tax(grossProfit, ifShort) {
    const results = [];
    let original = grossProfit;
    let taxed = 0;
    let principal = 0;
    let taxable = 0;
    if (ifShort) {
        if (grossProfit <= 9875) {
            taxable = .1 * grossProfit;
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        } else if (grossProfit <= 40125) {
            grossProfit -= 9875;
            taxable = .12 * grossProfit;
            taxed += taxable;
            taxable = .1 * (9875);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        } else if (grossProfit <= 85525) {
            grossProfit -= 40125;
            taxable = .22 * grossProfit;
            taxed += taxable;
            taxable = .12 * (40126 - 9876);
            taxed += taxable;
            taxable = .1 * (9875);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        } else if (grossProfit <= 163300) {
            grossProfit -= 85525;
            taxable = .24 * grossProfit;
            taxed += taxable;
            taxable = .22 * (85525 - 40126);
            taxed += taxable;
            taxable = .12 * (40126 - 9876);
            taxed += taxable;
            taxable = .1 * (9875);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        } else if (grossProfit <= 207350) {
            grossProfit -= 163300;
            taxable = .32 * grossProfit;
            taxed += taxable;
            taxable = .24 * (163300 - 85526);
            taxed += taxable;
            taxable = .22 * (85525 - 40126);
            taxed += taxable;
            taxable = .12 * (40126 - 9876);
            taxed += taxable;
            taxable = .1 * (9875);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        } else if (grossProfit <= 518400) {
            grossProfit -= 207350;
            taxable = .35 * grossProfit;
            taxed += taxable;
            taxable = .32 * (207350 - 163301);
            taxed += taxable;
            taxable = .24 * (163300 - 85526);
            taxed += taxable;
            taxable = .22 * (85525 - 40126);
            taxed += taxable;
            taxable = .12 * (40126 - 9876);
            taxed += taxable;
            taxable = .1 * (9875);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        } else {
            grossProfit -= 518400;
            taxable = .37 * grossProfit;
            taxed += taxable;
            taxable = .35 * (518400 - 207351);
            taxed += taxable;
            taxable = .32 * (207350 - 163301);
            taxed += taxable;
            taxable = .24 * (163300 - 85526);
            taxed += taxable;
            taxable = .22 * (85525 - 40126);
            taxed += taxable;
            taxable = .12 * (40126 - 9876);
            taxed += taxable;
            taxable = .1 * (9875);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        }
    } else {
        if (grossProfit < 40000) {
            results.push(grossProfit);
        } else if (grossProfit < 441450) {
            grossProfit -= 40000;
            taxable = .15 * grossProfit;
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxable);
        } else {
            grossProfit -= 441450;
            taxable = .2 * grossProfit;
            taxed += taxable;
            taxable = .15 * (441450 - 40000);
            taxed += taxable;
            principal = original - taxed;
            results.push(principal);
            results.push(taxed);
        }
    }
    return results;
  }
  
  let short = [];
  let long = [];

export default function Tax() {
    const [shortGains, setShortGains] = useState();
    const [longGains, setLongGains] = useState();

    const [grossProfit, setGrossProfit] = useState(0);

    useEffect(() => {
        short = tax(grossProfit, true);
        let data1 = {
          labels: [
            'Profit',
            'Taxed'
          ],
          datasets: [
            {
                label: 'Gross vs Net Profit',
                data: short,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ]
            }
          ]
        }
        setShortGains(data1);
      }, [grossProfit]);

      useEffect(() => {
        long = tax(grossProfit, false);
        let data2 = {
            labels: [
                'Profit',
                'Taxed'
            ],
            datasets: [
              {
                label: 'Gross vs Net Profit',
                data: long,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ]
              }
            ]
          }
        setLongGains(data2);
      }, [grossProfit]);

    return (
        <>
            <div className="Pie-Graph-short">
                <h1>Short Term Capital Gains</h1>
                <br></br>
                <Pie
                    data={shortGains}
                />
            </div>
            <div className="spacer"></div>
            <div className="taxForm">
            <Card style={{ width: '25rem' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item><label htmlFor="profit">Gross Capital Gains: ${grossProfit} </label></ListGroup.Item>
                    <ListGroup.Item><input type="text" name="profit" placeholder="Enter Gross Amount" onChange={(e) => setGrossProfit(Number(e.target.value))} ></input></ListGroup.Item>
                </ListGroup>
            </Card>
            </div>
            <div className="spacer"></div>
            <div className="Pie-Graph-long">
                <h1>Long Term Capital Gains</h1>
                <br></br>
                <Pie
                    data={longGains}
                />
            </div>
        </>
    )
}
