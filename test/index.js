'use strict';

// Inject env vars

process.env.VCS_REF = 'abcd123';
process.env.npm_package_version = '1.2.3';

// Dependencies

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

    const responseHealthCheck = await server.inject('/healthcheck');
    expect(responseHealthCheck.statusCode).to.equal(200);

    const responseHealth = await server.inject('/health');
    expect(responseHealth.statusCode).to.equal(200);

    expect(responseHealth.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123'
    });
});

it('works with custom string path', async () => {

    const server = Hapi.server();
    const options = {
        path: '/alive'
    };
    await server.register({ plugin: Health, options });

    const response = await server.inject('/alive');
    expect(response.statusCode).to.equal(200);
});

it('works with custom array path', async () => {

    const server = Hapi.server();
    const options = {
        path: ['/alive', '/ping']
    };
    await server.register({ plugin: Health, options });

    const responseAlive = await server.inject('/alive');
    expect(responseAlive.statusCode).to.equal(200);

    const responsePing = await server.inject('/ping');
    expect(responsePing.statusCode).to.equal(200);
});


it('works with custom response', async () => {

    const server = Hapi.server();
    const options = {
        response: { hello: 'world' }
    };
    await server.register({ plugin: Health, options });

    const response = await server.inject('/health');
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123',
        hello: 'world'
    });
});
