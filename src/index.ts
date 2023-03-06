import { createChart } from './chart';

import { startBleConnection } from './ble';
import { MOTION } from './types';

const chartContext = document.getElementById('myChart') as HTMLCanvasElement;

const chart = createChart(chartContext);

const motionBanner = document.getElementById('motion-status') as HTMLElement;

function detectedMotionCallback(motion: MOTION) {
    switch (motion) {
        case MOTION.SLEEP:
            motionBanner.textContent = `Sleep..`;
            break;
        case MOTION.MOVING:
            motionBanner.textContent = `moving..`;
            break;
        default:
            motionBanner.textContent = ``;
            break;
    }
}

const bleButton = document.getElementById('ble-button') as HTMLElement;

bleButton.addEventListener('click', () => startBleConnection({ chart, detectedMotionCallback }));
