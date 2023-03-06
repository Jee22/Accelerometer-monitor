import { ble_configs, LINE, MOTION } from './types';
import { Chart } from 'chart.js';

interface ConnectionProps {
    chart: Chart;
    detectedMotionCallback: (motion: MOTION) => void;
}

export const startBleConnection = async ({ chart, detectedMotionCallback }: ConnectionProps) => {
    await connectBLE({ chart, detectedMotionCallback });

    let lastAnimationFrameId: number;
    const RENDER_INTERVAL_MS = 50; // 렌더링 주기마다 차트 업데이트

    setInterval(() => {
        cancelAnimationFrame(lastAnimationFrameId);
        lastAnimationFrameId = requestAnimationFrame(() => chart.update());
    }, RENDER_INTERVAL_MS);
    // clearInterval(renderInterval);
};

const connectBLE = async ({ chart, detectedMotionCallback }: ConnectionProps) => {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: ble_configs.DEVICE_NAME }],
            optionalServices: [ble_configs.AXIS_SERVICE_UUID],
        });

        const server = await device.gatt!.connect();
        console.info(`server: `, server);

        const service = await server.getPrimaryService(ble_configs.AXIS_SERVICE_UUID);
        console.info(`service: `, service);

        const [xCharacteristic, yCharacteristic, zCharacteristic, magnitudeCharacteristic] = await Promise.all([
            service.getCharacteristic(ble_configs.X_CHAR),
            service.getCharacteristic(ble_configs.Y_CHAR),
            service.getCharacteristic(ble_configs.Z_CHAR),
            service.getCharacteristic(ble_configs.MAGNITUDE_CHAR),
        ]);

        /** x y z 벡터 크기 합 수신 이벤트*/
        magnitudeCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
            const magnitude = event.target.value.getInt16(0, true);
            const motionState = event.target.value.getInt8(2);

            detectedMotionCallback(motionState);
            updateRenderer({
                chart,
                lineIndex: LINE.MAGNITUDE,
                xAxesValue: axesStore.increaseMagnitude(),
                yAxesValue: magnitude,
            });
        });
        await magnitudeCharacteristic.startNotifications();

        // Characteristic 이벤트 등록
        [xCharacteristic, yCharacteristic, zCharacteristic].forEach((characteristic, index) => {
            characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
                const value = event.target.value.getInt16(0, true); // assuming int16 values from firmware

                switch (index) {
                    case LINE.X: // 센서 X notification
                        // console.log(`%c X [${value}]`, 'color:red;');
                        updateRenderer({
                            chart,
                            lineIndex: LINE.X,
                            xAxesValue: axesStore.increaseXAccelerometer(),
                            yAxesValue: value,
                        });
                        break;

                    case LINE.Y: // 센서 Y notification
                        // console.log(`%c Y [${value}]`, 'color:green;');
                        updateRenderer({
                            chart,
                            lineIndex: LINE.Y,
                            xAxesValue: axesStore.increaseYAccelerometer(),
                            yAxesValue: value,
                        });
                        break;

                    case LINE.Z: // 센서 Z notification
                        // console.log(`%c Z [${value}]`, 'color:blue;');
                        updateRenderer({
                            chart,
                            lineIndex: LINE.Z,
                            xAxesValue: axesStore.increaseZAccelerometer(),
                            yAxesValue: value,
                        });
                        break;
                }
            });

            characteristic.startNotifications();
        });
    } catch (error) {
        console.error(error);
    }
};

const axesStore = {
    xAccelerometerAxes: 0,
    increaseXAccelerometer: () => ++axesStore.xAccelerometerAxes,
    yAccelerometerAxes: 0,
    increaseYAccelerometer: () => ++axesStore.yAccelerometerAxes,
    zAccelerometerAxes: 0,
    increaseZAccelerometer: () => ++axesStore.zAccelerometerAxes,
    magnitudeAxes: 0,
    increaseMagnitude: () => ++axesStore.magnitudeAxes,
    xGyroAxes: 0,
    increaseXGyro: () => ++axesStore.xGyroAxes,
    yGyroAxes: 0,
    increaseYGyro: () => ++axesStore.yGyroAxes,
    zGyroAxes: 0,
    increaseZGyro: () => ++axesStore.zGyroAxes,
};

/** Todo: extract */
interface RenderProps {
    chart: Chart;
    lineIndex: number;
    xAxesValue: number;
    yAxesValue: number;
}

/** Todo: extract */
const updateRenderer = ({ chart, lineIndex, xAxesValue, yAxesValue }: RenderProps) => {
    chart.data.datasets[lineIndex].data.push({ x: xAxesValue, y: yAxesValue });

    removePrevLine(chart, lineIndex);
};

/** Todo: extract */
const removePrevLine = (chart: Chart, axesIndex: number) => {
    if (chart.data.datasets[axesIndex].data.length > LINE.MAX_POINTS_LENGTH) {
        const removeRangeIndex = Math.round(
            chart.data.datasets[axesIndex].data.length * (LINE.PERCENT_TO_REMOVE / 100),
        );
        chart.data.datasets[axesIndex].data.splice(0, removeRangeIndex);
    }
};
