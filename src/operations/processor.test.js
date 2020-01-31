const Parser = require('../parser/noop-parser');
const OperationProcessor = require('./processor');
const testData = require('../../data');
const manager = require('../state/manager');

const processor = new OperationProcessor(new Parser());

describe('processor integration test', () => {

    beforeEach(() => manager.clear());

    test('test an invalid input', () => {
        const result = processor.process();

        expect(result).toBeFalsy();
    });

    test('test an invalid operation', () => {
        expect(() => {
            processor.process({"invalidType": {}});
        }).toThrowError('Invalid operation type');
    });

    test('test operations_0.json data', () => {
        const result = testData[0].map(line => processor.process(line));

        expect(result[0]).toMatchObject({"account": {"active-card": true, "available-limit": 100, "violations": [""]}});
        expect(result[1]).toMatchObject({"account": {"active-card": true, "available-limit": 80, "violations": [""]}});
        expect(result[2]).toMatchObject({"account": {"active-card": true, "available-limit": 80, "violations": ["insufficient-limit"]}});
    });

    test('test operations_1.json data', () => {
        const result = testData[1].map(line => processor.process(line));

        expect(result[0]).toMatchObject({"account": {"active-card": true, "available-limit": 100, "violations": [""]}});
        expect(result[1]).toMatchObject({"account": {"active-card": true, "available-limit": 100, "violations": ["already-initialized"]}});
    });

    test('test operations_3.json data', () => {
        const result = testData[2].map(line => processor.process(line));

        expect(result[0]).toMatchObject({"account": {"active-card": true, "available-limit": 200, "violations": [""]}});
        expect(result[1]).toMatchObject({"account": {"active-card": true, "available-limit": 180, "violations": [""]}});
        expect(result[2]).toMatchObject({"account": {"active-card": true, "available-limit": 180, "violations": ["already-initialized"]}});
        expect(result[3]).toMatchObject({"account": {"active-card": true, "available-limit": 150, "violations": [""]}});
        expect(result[4]).toMatchObject({"account": {"active-card": true, "available-limit": 150, "violations": ["doubled-transaction"]}});
        expect(result[5]).toMatchObject({"account": {"active-card": true, "available-limit": 50, "violations": [""]}});
        expect(result[6]).toMatchObject({"account": {"active-card": true, "available-limit": 20, "violations": [""]}});
        expect(result[7]).toMatchObject({"account": {"active-card": true, "available-limit": 20, "violations": ["insufficient-limit"]}});
        expect(result[8]).toMatchObject({"account": {"active-card": true, "available-limit": 20, "violations": ["high-frequency-small-interval"]}});
        expect(result[9]).toMatchObject({"account": {"active-card": true, "available-limit": 0, "violations": [""]}});
    });
});
