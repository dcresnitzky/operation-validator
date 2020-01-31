const Transaction = require('../transaction');

module.exports = (operation, manager) => {
    const lastStates = manager.getTransactionsByTimeWindow(operation.time, 2);

    return lastStates.some(state => {
        return state.operation instanceof Transaction &&
            state.operation.amount === operation.amount &&
            state.operation.merchant === operation.merchant

    }) ? 'doubled-transaction' : '';

};
