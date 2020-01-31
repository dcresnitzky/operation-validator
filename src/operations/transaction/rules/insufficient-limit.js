module.exports = (operation, manager) => manager.getCurrent().availableLimit < operation.amount ? 'insufficient-limit' : '';
