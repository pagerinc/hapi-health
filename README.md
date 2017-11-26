# hapi-health

# Usage

## Install from NPM

```
    npm install @pager/hapi-health --save
```

## Options

```javascript
{
    path: '/health',
    auth: true,
    response: {
        sha: process.env.GIT_SHA
        ver: process.env.npm_package_version
    }
}
```

 - **path**: String or String Array of the paths to expose, defaults to `/health`
 - **[auth]**: Boolean to protect or not the path, defaults to `false`
 - **[response]**: Properties to be appended to the response, if not set won't return a json payload


