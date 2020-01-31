const Storage = require('../storage/memory-storage');
const State = require('./state');
/*
 * The state manager has the memory storage as a part of it composition. It delegates the responsibility of changing
 * the state to the operation in question. This object is only responsible for retrieving the current state from
 * the storage and mutating when needed. It also has some helper methods being used in tests and other parts
 */
class SingletonStateManager {

    constructor(storage) {
        this._storage = storage;
    }

    createFromOperation(operation) {
        const result = operation.doOperationAgainst(this.getCurrent());

        this._storage.add(new State(result.activeCard, result.availableLimit, operation));
    }

    getCurrent() {
        return this._storage.last();
    }

    getTransactionsByTimeWindow(time, minutesBefore) {
        return this._storage.getTransactionsByTimeWindow(time, minutesBefore)
    }

    clear () {
        this._storage.clear()
    }
}

module.exports = new SingletonStateManager(new Storage());
