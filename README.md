<h1 align="center">html-webpack-custom-inject</h1>

<h2 align="center">Install</h2>

```bash
npm install --save-dev html-webpack-custom-inject
```

<h2 align="center">Usage</h2>

enhance html-webpack-plugin, you can use this plugin inject code fragment before html emit.
html template as follows:
**index.html**
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="name" itemprop="name" content="feflow" />
    <title>html resource webpack plugin template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="container">
        <!--[prerender placeholder]-->
    </div>
</body>

</html>
```
config as follows:
**webpack.config.js**
```js
const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackCustomInject = require('html-webpack-custom-inject')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html'),
        }),
        new htmlCopyCustomInject({
            inject(chunkId, res) {
                console.log(chunkId, /index\.html$/.test(chunkId))
                if (/index\.html$/.test(chunkId)) {
                    return res.replace(/<!--\s*\[prerender\s*placeholder\]\s*-->/g, function() {
                        let res = '<div>code fragment you want to inject<div>';
                        return res;
                    })
                }
                return res;
            }
        })
  ]
}
```


<h2 align="center">Options</h2>

You can pass a hash of configuration options to `html-webpack-custom-inject`.
Allowed values are as follows

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`inject`](#)**|`{function inject(entryKey: string,res:string): string}}`||inject|

}
