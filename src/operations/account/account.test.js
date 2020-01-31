const manager = require('../../state/manager');
const State = require('../../state/state');
const Account = require('./account');

describe('test account operations states', () => {

    const account = new Account({
        "active-card": true,
        "available-limit": 100
    });

    manager.clear();

    test('authorize a account creation on a valid state', () => {
        manager.createFromOperation(account);
        const state = manager.getCurrent();

        expect(state).toBeInstanceOf(State);
        expect(state).toHaveProperty('activeCard', true);
        expect(state).toHaveProperty('availableLimit', 100);
        expect(state.operation).toBeInstanceOf(Account);
        expect(state.operation).toMatchObject(account);
    });
});
