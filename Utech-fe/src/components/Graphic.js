import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';

const plotOptions = {
    series: {
        pointStart: 2017,
        turboThreshold: 100000
    }
};



const Graphic = () => (
    <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
            <Chart />

            <Title>Revenues per months</Title>

            <Subtitle>Compared to all users</Subtitle>

            <Legend layout="vertical" align="right" verticalAlign="middle" />

            <XAxis>
                <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
                <YAxis.Title>Revenue ( LEI )</YAxis.Title>
                <LineSeries name="Personal" data={[500, 1000, 700, 340]} />
                <LineSeries name="All users" data={[300, 700, 800, 200]} />

            </YAxis>
        </HighchartsChart>
    </div>
);

export default withHighcharts(Graphic, Highcharts);
