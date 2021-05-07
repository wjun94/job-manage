### 代码提交规范

```
💥 feat(模块): 添加了个很棒的功能
🐛 fix(模块): 修复了一些 bug
📝 docs(模块): 更新了一下文档
🌷 UI(模块): 修改了一下样式
🏰 chore(模块): 对脚手架做了些更改
🌐 locale(模块): 为国际化做了微小的贡献
See .github/commit-convention.md for more details.
```

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
