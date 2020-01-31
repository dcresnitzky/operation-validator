const Operation = require('../operation');

module.exports = class Account extends Operation {

    constructor(data) {
        super(require('./rules'));

        this.activeCard = data['active-card'];
        this.availableLimit = data['available-limit'];
    }

    doOperationAgainst(lastState) {
        return {
            activeCard: this.activeCard,
            availableLimit: this.availableLimit,
        }
    }
};
