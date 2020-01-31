const manager = require('../../../state/manager');
const Account = require('../account');

describe('rules to account operation', () => {

    beforeAll(() => {
        manager.clear();
    });

    const accountOperation = new Account({
        "active-card": true,
        "available-limit": 100
    });

    test('authorize a account creation on an fresh state', () => {
        expect(accountOperation.isValid()).toBeTruthy();
        expect(accountOperation.getViolation()).toMatch("");
    });

    test('already-initialized account state', () => {
        manager.createFromOperation(accountOperation);

        expect(accountOperation.isValid()).toBeFalsy();
        expect(accountOperation.getViolation()).toMatch('already-initialized');
    });
});
