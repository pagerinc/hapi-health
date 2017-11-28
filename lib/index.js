'use strict';

const Joi = require('joi');

const internals = {
    defaults: {
        ver: process.env.npm_package_version,
        sha: process.env.VCS_REF
    }
};


exports.register = (server, options, next) => {

    const response = Object.assign(internals.defaults, options.response);

    const config = {
        auth: !!options.auth,
        handler: (request, reply) => reply.response(response),
        response: {
            schema: Joi.object({
                ver: Joi.string().regex(/[0-9]+(\.[0-9]+)*/).required(),
                sha: Joi.string().alphanum().length(7).default('plzSet1')
            }).unknown(),
            failAction: console.log
        }
    };

    let paths = options.path || ['/health', '/healthcheck'];
    paths = typeof paths === 'string' ? paths.split(',') : paths;

    paths.forEach((path) => server.route({ method: 'GET', path, config }));

    // Hapi v16 support
    /* $lab:coverage:off$ */
    if (next && typeof next === 'function') {
        next();
    }
    /* $lab:coverage:on$ */
};

// Hapi v16 support
exports.register.attributes = {
    pkg: require('../package.json')
};

exports.pkg = require('../package.json');
