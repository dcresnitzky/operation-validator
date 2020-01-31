const Transaction = require('../transaction');

module.exports = (operation, manager) => {
    const lastStates = manager.getTransactionsByTimeWindow(operation.time, 2);

    return lastStates.filter(state => state.operation instanceof Transaction).length > 2 ?
        'high-frequency-small-interval' : '';

};
