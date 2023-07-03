import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { MOTION } from './types';

Chart.register(...registerables);

const MAX_Y_AXES_HEIGHT = 17000;
const TICK_GAP = 100;
const ANIMATION_DURATION = 0;
export const createChart = (ctx: HTMLCanvasElement) => new Chart(ctx, chartConfigs);

const colorStore = {
    magnitudeBorder: 'rgba(123, 123, 123, 1)',
    magnitudeBackground: 'rgba(123, 123, 123, 0.2)',
    setMovingLineColor: (r: number, g: number, b: number) => {
        colorStore.magnitudeBorder = `rgba(${r}, ${g}, ${b}, 1)`;
        colorStore.magnitudeBackground = `rgba(${r}, ${g}, ${b}, 0.2)`;
    },
};

const data: ChartData = {
    labels: [],
    datasets: [
        {
            label: 'x',
            data: [],
            pointRadius: 0,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
        },
        {
            label: 'y',
            data: [],
            pointRadius: 0,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
        },
        {
            label: 'z',
            data: [],
            pointRadius: 0,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
        },
        // {
        //     label: 'magnitude',
        //     data: [],
        //     pointRadius: 0,
        //     borderColor: colorStore.magnitudeBorder,
        //     backgroundColor: colorStore.magnitudeBackground,
        //     fill: false,
        // },
    ],
};

const chartConfigs: ChartConfiguration = {
    data: data,
    type: 'line',
    options: {
        responsive: true,
        animation: {
            duration: ANIMATION_DURATION,
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                grid: {
                    display: true,
                },
            },
            y: {
                grid: {
                    display: true,
                },
                position: 'right',
                min: -MAX_Y_AXES_HEIGHT,
                max: MAX_Y_AXES_HEIGHT,
                title: {
                    display: true,
                    text: '센서 값',
                },
                ticks: {
                    stepSize: TICK_GAP,
                },
            },
            yLeftLabel: {
                position: 'left',
                min: -MAX_Y_AXES_HEIGHT,
                max: MAX_Y_AXES_HEIGHT,
                title: {
                    display: true,
                    text: '센서 값',
                },
                ticks: {
                    stepSize: TICK_GAP,
                },
            },
        },
    },
};

export const selectLineColor = (motion: MOTION) => {
    switch (motion) {
        case MOTION.SLEEP:
            colorStore.setMovingLineColor(123, 123, 123);
            break;
        case MOTION.MOVING:
            colorStore.setMovingLineColor(66, 157, 32);
            break;

        /** Not impl */
        case MOTION.IDLE:
            break;
        default:
            break;
    }
};
