class HtmlWebpackCustomInject {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.compilation.tap('htmlWebpackCustomInject', (compilation) => {
                compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                    'htmlWebpackCustomInject',
                    (data, cb) => {
                        if (this.options.inject) {
                            data.html = this.options.inject(data.outputName, data.html)
                        }
                        cb(null, data);
                    })
            })
        } else {
            compilation.plugin('html-webpack-plugin-after-html-processing', (data, cb) => {
                if (this.options.inject) {
                    data.html = this.options.inject(data.outputName, data.html)
                }
                cb(null, data);
            })
        }
    }
}

module.exports = HtmlWebpackCustomInject;