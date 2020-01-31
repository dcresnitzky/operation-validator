const Operation = require('../operation');

module.exports = class Transaction extends Operation {

    constructor(data) {
        super(require('./rules'));

        this.amount = data.amount;
        this.merchant = data.merchant;
        this.time = new Date(data.time);
    }

    doOperationAgainst(lastState) {
        return {
            activeCard: lastState.activeCard,
            availableLimit: lastState.availableLimit - this.amount,
        }
    }
};
