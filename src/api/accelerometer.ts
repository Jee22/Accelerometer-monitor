import { apiClient } from './api-client';

export const saveXAccelerometerLog = (xRawChunk: number[]) => {
    return apiClient.post('accelerometer/x', { chunk: xRawChunk });
};

export const saveYAccelerometerLog = (yRawChunk: number[]) => {
    return apiClient.post('accelerometer/y', { chunk: yRawChunk });
};

export const saveZAccelerometerLog = (zRawChunk: number[]) => {
    return apiClient.post('accelerometer/z', { chunk: zRawChunk });
};

export const saveXGyroLog = (xRawChunk: number[]) => {
    return apiClient.post('gyro/x', { chunk: xRawChunk });
};

export const saveYGyroLog = (yRawChunk: number[]) => {
    return apiClient.post('gyro/y', { chunk: yRawChunk });
};

export const saveZGyroLog = (zRawChunk: number[]) => {
    return apiClient.post('gyro/z', { chunk: zRawChunk });
};
