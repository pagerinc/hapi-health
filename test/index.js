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


it('works for /health with no options', async () => {

    const server = new Hapi.Server();
    await server.register(Health);

    const request = { method: 'GET', url: '/health' };
    const response = await server.inject(request);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123'
    });
});

it('works for /healthcheck with no options', async () => {

    const server = new Hapi.Server();
    await server.register(Health);

    const request = { method: 'GET', url: '/healthcheck' };
    const response = await server.inject(request);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123'
    });
});

it('works with empty default options', async () => {

    const server = new Hapi.Server();

    const options = {
        response: {
            sha: undefined,
            ver: undefined
        }
    };

    await server.register({
        plugin: Health,
        options
    });

    const request = { method: 'GET', url: '/healthcheck' };
    const response = await server.inject(request);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({
        ver: '0.0.0',
        sha: 'undefnd'
    });

});

it('works with custom string path', async () => {

    const server = new Hapi.Server();

    const options = {
        path: '/alive'
    };

    await server.register({
        plugin: Health,
        options
    });

    const request = { method: 'GET', url: '/alive' };
    const response = await server.inject(request);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123'
    });

});

it('works with custom array path', async () => {

    const server = new Hapi.Server();

    const options = {
        path: ['/alive', '/ping']
    };

    await server.register({
        plugin: Health,
        options
    });

    const aliveResponse = await server.inject({ method: 'GET', url: '/alive' });

    expect(aliveResponse.statusCode).to.equal(200);
    expect(aliveResponse.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123'
    });

    const pingResponse = await server.inject({ method: 'GET', url: '/ping' });

    expect(pingResponse.statusCode).to.equal(200);
    expect(pingResponse.result).to.equal({
        ver: '1.2.3',
        sha: 'abcd123'
    });
});

it('works with custom response', async () => {

    const server = new Hapi.Server();

    const options = {
        response: {
            hello: 'world'
        }
    };

    await server.register({
        plugin: Health,
        options
    },);

    const request = { method: 'GET', url: '/health' };
    const response = await server.inject(request);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal({
        hello: 'world',
        ver: '1.2.3',
        sha: 'abcd123'
    });

});
