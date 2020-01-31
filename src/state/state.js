module.exports = class State {

    constructor(activeCard, availableLimit, operation) {
        this.activeCard = activeCard;
        this.availableLimit = availableLimit;
        this.operation = operation;
    }

    toJSON() {
        return {
            'active-card': this.activeCard,
            'available-limit': this.availableLimit,
        }
    }
};
