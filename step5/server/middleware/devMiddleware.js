const devMiddleware = require('webpack-dev-middleware')

module.exports = (compiler, opts) => {
    const expressMiddleware = devMiddleware(compiler, opts)
    return async (ctx, next) => {
        await expressMiddleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
}