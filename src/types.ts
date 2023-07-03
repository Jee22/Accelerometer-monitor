export enum ble_configs {
    DEVICE_NAME = '3Axis',
    AXIS_SERVICE_UUID = 'ef680800-9b35-4933-9b10-52ffa9740042',
    X_CHAR = 'ef680806-9b35-4933-9b10-52ffa9740042',
    Y_CHAR = 'ef680807-9b35-4933-9b10-52ffa9740042',
    Z_CHAR = 'ef680808-9b35-4933-9b10-52ffa9740042',
    // MAGNITUDE_CHAR = 'ef680809-9b35-4933-9b10-52ffa9740042',
}

export enum LINE {
    X = 0,
    Y = 1,
    Z = 2,
    MAGNITUDE = 3,
    // 그래프 최적화 설정
    MAX_POINTS_LENGTH = 100,
    PERCENT_TO_REMOVE = 0.5, // %
}

export enum MOTION {
    SLEEP = 0,
    MOVING,
    IDLE,
}
