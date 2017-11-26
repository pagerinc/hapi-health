'use strict';


exports.register = (server, options) => {

    const config = {
        auth: !!options.auth,
        handler: (request, reply) => reply.response(options.response)
    };

    let paths = options.path || ['/health'];
    paths = typeof paths === 'string' ? paths.split(',') : paths;

    paths.forEach((path) => server.route({ method: 'GET', path, config }));
};

exports.pkg = require('../package.json');
