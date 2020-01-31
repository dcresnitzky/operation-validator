## Authorizer

Authorizer is an application thatthat authorizes a transaction for a specific account following a set of predefined
 rules. It was developed in Javascript using node 10.17 because it was already installed on my personal computer.

### Building

Run `docker build -t authorizer .`

### Testing

Run `docker run authorizer coverage`

### Running 

Run `docker run -it authorizer`

### Running without Docker

```shell script
npm i 
npm run coverage #test
npm run auth #run
```