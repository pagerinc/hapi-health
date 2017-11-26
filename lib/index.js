'use strict';


exports.register = (server, options, next) => {

    const config = {
        auth: !!options.auth,
        handler: (request, reply) => reply.response(options.response)
    };

    let paths = options.path || ['/health'];
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
