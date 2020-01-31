const split = require('split');
const Parser = require('./parser/json-parser');
const OperationProcessor = require('./operations/processor');
const processor = new OperationProcessor(new Parser());

//OperationProcessor reads line by line and prints on console the result;
process.stdin.pipe(split()).on('data', line => {

    const output = processor.process(line);

    if (output) console.log(JSON.stringify(output));
});
