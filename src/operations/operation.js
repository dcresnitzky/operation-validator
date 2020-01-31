const stateManager = require('../state/manager');
/*
 * Operation is an abstract class, it receives an array of rules and an object of data respective to each operation.
 * Each operation knows how to change the current state and also knows how to validate itself against current
 * state. The rules is an array of high-order-functions that uses the state manager and the operation
 */
module.exports = class Operation {

    constructor(rules) {
        this._rules = rules;
        this._violation = '';
    }

    isValid() {
        this._violation = '';

        for (let i = 0; i < this._rules.length; i++) {
            this._violation = this._rules[i](this, stateManager);

            if (this._violation)
                return false;
        }
        return true;
    }

    getViolation() {
        return this._violation;
    }
};
