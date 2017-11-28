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


it('works for /health with no options', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const request = { method: 'GET', url: '/health' };

    server.register(Health, (err) => {

        expect(err).to.not.exist();
        server.inject(request, (response) => {

            expect(response.statusCode).to.equal(200);

            expect(response.result).to.equal({
                ver: '1.2.3',
                sha: 'abcd123'
            });

            done();
        });
    });
});

it('works for /healthcheck with no options', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const request = { method: 'GET', url: '/health' };

    server.register(Health, (err) => {

        expect(err).to.not.exist();
        server.inject(request, (response) => {

            expect(response.statusCode).to.equal(200);

            expect(response.result).to.equal({
                ver: '1.2.3',
                sha: 'abcd123'
            });

            done();
        });
    });
});

it('works with empty default options', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugins = [{
        register: Health,
        options: {
            response: {
                sha: undefined,
                ver: undefined
            }
        }
    }];

    const request = { method: 'GET', url: '/health' };

    server.register(plugins, (err) => {

        expect(err).to.not.exist();
        server.inject(request, (response) => {

            expect(response.statusCode).to.equal(200);

            expect(response.result).to.equal({
                ver: '0.0.0',
                sha: 'plzSet1'
            });

            done();
        });
    });
});

it('works with custom string path', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugins = [{
        register: Health,
        options: {
            path: '/alive'
        }
    }];

    const request = { method: 'GET', url: '/alive' };

    server.register(plugins, (err) => {

        expect(err).to.not.exist();
        server.inject(request, (response) => {

            expect(response.statusCode).to.equal(200);

            done();
        });
    });
});

it('works with custom array path', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugins = [{
        register: Health,
        options: {
            path: ['/alive', '/ping']
        }
    }];

    const request = { method: 'GET', url: '/ping' };

    server.register(plugins, (err) => {

        expect(err).to.not.exist();
        server.inject(request, (response) => {

            expect(response.statusCode).to.equal(200);

            done();
        });
    });
});

it('works with custom response', (done) => {

    const server = new Hapi.Server();
    server.connection();

    const plugins = [{
        register: Health,
        options: {
            response: {
                hello: 'world'
            }
        }
    }];

    const request = { method: 'GET', url: '/health' };

    server.register(plugins, (err) => {

        expect(err).to.not.exist();
        server.inject(request, (response) => {

            expect(response.statusCode).to.equal(200);

            expect(response.result).to.equal({
                ver: '1.2.3',
                sha: 'abcd123',
                hello: 'world'
            });

            done();
        });
    });
});
