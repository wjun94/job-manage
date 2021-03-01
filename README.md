### 学习文档
[创建react项目](https://create-react-app.dev/docs/getting-started/)
[React官方文档](https://zh-hans.reactjs.org/)

### 代码分割
请查看相关文档：https://create-react-app.dev/docs/code-splitting/

### 分析包大小
请查看相关文档：https://create-react-app.dev/docs/analyzing-the-bundle-size/

### 创建应用
请查看相关文档：https://create-react-app.dev/docs/making-a-progressive-web-app/

### 全局配置less和sass
config/webpack.config.js
```js
// less
{
	test: lessRegex,
	exclude: /node_modules/,
	use: getStyleLoaders(
		{
			// javascriptEnabled: true,
			importLoaders: 2,
			modules: true,
			localIdentName: "[name]-[local]-[hash:base64:5]",
			sourceMap: isEnvProduction && shouldUseSourceMap
		},
		"less-loader"
	).concat({
		loader: require.resolve("style-resources-loader"),
		options: {
			patterns: [path.resolve(__dirname, "../src/common/common.less")]
		}
	}),
	sideEffects: true
},

// sass
 {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders({
        importLoaders: 3,
        sourceMap: isEnvProduction ?
        shouldUseSourceMap : isEnvDevelopment,
    },
    'sass-loader'
    ).concat({
        loader: require.resolve("sass-resources-loader"),
        options: {
            resources: [path.resolve(__dirname, "../src/css/common.scss")]
        }
    }),
    sideEffects: true,
},
```
