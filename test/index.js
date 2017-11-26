'use strict';

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');

const Health = require('../lib');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.it;


it('works with no options', async () => {

    const server = Hapi.server();
    await server.register(Health);

    const response = await server.inject('/health');
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.not.exist();
});

it('works with custom string path', async () => {

    const server = Hapi.server();
    const options = {
        path: '/healthcheck'
    };
    await server.register({ plugin: Health, options });

    const responseHealthCheck = await server.inject('/healthcheck');
    expect(responseHealthCheck.statusCode).to.equal(200);

    const responseHealth = await server.inject('/health');
    expect(responseHealth.statusCode).to.equal(404);
});

it('works with custom array path', async () => {

    const server = Hapi.server();
    const options = {
        path: ['/healthcheck', '/health']
    };
    await server.register({ plugin: Health, options });

    const responseHealthCheck = await server.inject('/healthcheck');
    expect(responseHealthCheck.statusCode).to.equal(200);

    const responseHealth = await server.inject('/health');
    expect(responseHealth.statusCode).to.equal(200);
});


it('works with custom response', async () => {

    const server = Hapi.server();
    const options = {
        response: { hello: 'world' }
    };
    await server.register({ plugin: Health, options });

    const response = await server.inject('/health');
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({ hello: 'world' });
});
