module.exports = class MemoryStorage {

    constructor() {
        this._states = [];
        this._count = 0;
    }

    add(state) {
        this._states.push(state);
        this._count++;
    }

    last() {
        return this._states[this._count - 1];
    }

    getTransactionsByTimeWindow(time, minutesBefore) {
        const before = new Date(time);

        return this._states.filter(state => {
            return state.operation.hasOwnProperty('time') &&
                state.operation.time.valueOf() >= before.setMinutes(before.getMinutes() - minutesBefore);
        });
    }

    clear() {
        this._states = [];
        this._count = 0;
    }
};
