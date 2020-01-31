const manager = require('../../../state/manager');
const Account = require('../../account/account');
const Transaction = require('../transaction');

describe('rules to transaction operation', () => {

    describe('account-not-initialized rule', () => {

        beforeEach(() => manager.clear());

        test('a transaction to an account-not-initialized state', () => {

            const transaction = new Transaction({
                amount: 80,
                merchant: 'Pizza Hut',
                time: new Date().toString(),
            });

            expect(transaction.isValid()).toBeFalsy();
            expect(transaction.getViolation()).toMatch('account-not-initialized');
        });

        test('a transaction to an account-initialized state', () => {

            manager.createFromOperation(new Account({
                "active-card": true,
                "available-limit": 100
            }));

            const transaction = new Transaction({
                amount: 80,
                merchant: 'Pizza Hut',
                time: new Date().toString(),
            });

            expect(transaction.isValid()).toBeTruthy();
            expect(transaction.getViolation()).toMatch('');
        });
    });

    describe('card-not-active rule', () => {

        beforeEach(() => manager.clear());

        const transaction = new Transaction({
            amount: 80,
            merchant: 'Pizza Hut',
            time: new Date().toString(),
        });

        test('a transaction to a card-not-active account state', () => {

            manager.createFromOperation(new Account({
                "active-card": false,
                "available-limit": 100
            }));

            expect(transaction.isValid()).toBeFalsy();
            expect(transaction.getViolation()).toMatch('card-not-active');

        });

        test('a transaction to a card-active account state', () => {

            manager.createFromOperation(new Account({
                "active-card": true,
                "available-limit": 100
            }));

            expect(transaction.isValid()).toBeTruthy();
            expect(transaction.getViolation()).toMatch('');
        });
    });

    describe('insufficient-limit rule', () => {

        beforeEach(() => manager.clear());

        const transaction = new Transaction({
            amount: 80,
            merchant: 'Pizza Hut',
            time: new Date().toString(),
        });

        test('a transaction to a insufficient-limit account state', () => {

            manager.createFromOperation(new Account({
                "active-card": true,
                "available-limit": 0
            }));

            expect(transaction.isValid()).toBeFalsy();
            expect(transaction.getViolation()).toMatch('insufficient-limit');

        });

        test('a transaction to a sufficient-limit account state', () => {

            manager.createFromOperation(new Account({
                "active-card": true,
                "available-limit": 80
            }));

            expect(transaction.isValid()).toBeTruthy();
            expect(transaction.getViolation()).toMatch('');
        });
    });

    const transactions = [
        new Transaction({
            amount: 10,
            merchant: 'Pizza Hut',
            time: '2020-04-02 20:00:00',
        }),
        new Transaction({
            amount: 10,
            merchant: 'Sushi1',
            time: '2020-04-02 20:00:00',
        }),
        new Transaction({
            amount: 10,
            merchant: 'Habbibs',
            time: '2020-04-02 20:00:00',
        }),
        new Transaction({
            amount: 10,
            merchant: 'Alcapizza',
            time: '2020-04-02 20:05:00'
        })
    ];

    describe('high-frequency-small-interval rule', () => {

        beforeEach(() => {
            manager.clear();
            manager.createFromOperation(new Account({
                "active-card": true,
                "available-limit": 80
            }));
            manager.createFromOperation(transactions[0]);
            manager.createFromOperation(transactions[1]);
            manager.createFromOperation(transactions[2]);
        });

        test('a high-frequency-small-interval state', () => {
            expect(transactions[2].isValid()).toBeFalsy();
            expect(transactions[2].getViolation()).toMatch('high-frequency-small-interval');
        });

        test('a not high-frequency-small-interval', () => {
            expect(transactions[3].isValid()).toBeTruthy();
            expect(transactions[3].getViolation()).toMatch('');
        });
    });

    describe('doubled-transaction rule', () => {

        beforeEach(() => {
            manager.clear();
            manager.createFromOperation(new Account({
                "active-card": true,
                "available-limit": 80
            }));
            manager.createFromOperation(transactions[0]);
        });

        test('a doubled-transaction state', () => {
            expect(transactions[0].isValid()).toBeFalsy();
            expect(transactions[0].getViolation()).toMatch('doubled-transaction');
        });

        test('a not doubled-transaction', () => {
            expect(transactions[1].isValid()).toBeTruthy();
            expect(transactions[1].getViolation()).toMatch('');
        });
    });
});
