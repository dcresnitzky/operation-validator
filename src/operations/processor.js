const operations = require('.');
const stateManager = require('../state/manager');
/*
 * OperationsProcessor parse the input line, validate it against a list of operations types defined on operations var
 * these list imports the necessary constructors for each operation. After validation the processor delegates the
 * job of storing the operation on the state manager. A singleton object that handles the state of application
 */
module.exports = class OperationProcessor {

    constructor(parser) {
        this._parser = parser;
    }

    process(line) {
        const operationParsed = this._parser.parse(line);

        if (!operationParsed) return;

        const [type] = Object.keys(operationParsed);
        const data = operationParsed[type];

        if (!operations.hasOwnProperty(type)) {
            throw new Error('Invalid operation type');
        }

        const operation = new operations[type](data);

        if (operation.isValid()) {
            stateManager.createFromOperation(operation);
        }

        return {'account': {...stateManager.getCurrent().toJSON(), violations: [operation.getViolation()]}};
    }
};
