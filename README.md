# To run: `npm run start`

# Dependencies:
```
node, npm
webpack@latest, webpack-dev-server@latest (global installs req'd)
babel-loader, babel-core, babel-preset-es2015
sass-loader, node-sass, css-loader, style-loader
extract-text-webpack-plugin
uglifyjs-webpack-plugin, optimize-css-assets-webpack-plugin
image-webpack-loader file-loader
react react-dom babel-preset-react
css-hot-loader
autoprefixer postcss-loader
webpack-dashboard
```

# To build: abbreviated annotations of Indrek Lasn's series
(I-VI)

# I.
## see: https://codeburst.io/easy-guide-for-webpack-2-0-from-scratch-fe508a3ce44e

###(1)Init the project
Command line:
```
node -v
mkdir webpack-2.0-from-scratch
cd webpack-2.0-from-scratch/
npm init -y
touch index.hmtl webpack.config.js index.js README.md
```

###(2) `index.html` boilerplate
See `index.html` header; Atom `html` shortcut muy bien

###(3)Install webpack
Command line:
```
npm i --save-dev webpack@latest webpack-dev-server@latest
```
"We are installing Webpack and Webpack development server. We need a HTTP client to serve our files, that’s why we’re installing the dev-server."

###(4)Configs via `webpack.config.js`
- `req` is a fantastic keyword in Atom
- re: `entry` & `output`: "Basic workflow goes like this: We write code, webpack reads it, compiles it, spits out a compiled version out for the browser."
- export to the outside world via `exports` statemt

###(5)`src` the webpack `output` file in `index.html`
"Every web file has at least one single .html file. This is where the browser starts working with us." Enclose webpack output in `<script>`s.

###(6)Install webpack globally for manual testing
Command line:
```
npm i -g webpack@latest
```

###(7)Run webpack!
Command line:
```
webpack
```



# II.
## see: https://codeburst.io/simple-beginner-guide-for-webpack-2-0-from-scratch-part-ii-66beb5dbccc2

###(1) Command-line watch webpack (`webpack --watch`, `npm run watch`)
Just command-line it: `webpack --watch`
and/or:
a) add to `package.json`:   `"scripts": {
    "watch": "webpack --watch",`
b) Commande line: `npm run watch`

###(2) Compile ES6 to ES5 via Babel
Command line:
```
npm install --save-dev babel-loader babel-core
```
"Loaders allow you to preprocess files as you `require()` or 'load' them."
Add first loader rule to `webpack.config.js`. (Init `module`, `rules`; write test for `/\.js$/` files)
Test via `index.js` (throw on some sugar)

###(3) Install Babel presets
Command line:
```
npm install --save-dev babel-preset-es2015
```

###(3) Config `.babelrc`
`{ "presets": ["es2015"] }`
Test via `index.js` (e.g. write a class)

###(4) Compile styles (SCSS -> CSS)
Command line:
```
npm i --save-dev sass-loader node-sass css-loader style-loader
```
Add new rule to `webpack.config.js` loader for `/\.scss$/` files.

Test out by creating and populating a new `styles.scss` file (e.g. change the `background-color` to a `$variable`), and requiring `styles.scss` in `index.js`.


# III.
## see: https://codeburst.io/simple-beginner-guide-for-webpack-2-0-from-scratch-part-iii-d374c021f9fc

###(0) "Cleaning up time!"
```
mkdir src
mv index.js styles.scss

mkdir public
mv index.html output.js
```
Then update `webpack.config.js` paths.
```
req path
let config = {

  entry: './src/index.js',  // we write code
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'  //webpack outputs compiled version

  },
(etc)
```
- "The `path` module provides utilities for working with file and directory paths" (Node.js docs)
- Webpack needs an absolute path to work properly. We can accomplish this by using <a href=https://webpack.js.org/configuration/resolve/>`resolve`</a>

###(1) Compile styles, cont'd. - `styles.scss` -> `styles.css` via `extract-text-webpack-plugin`
Command line:
```
npm install --save-dev extract-text-webpack-plugin
```
"<a href=https://webpack.js.org/configuration/plugins/>Plugins</a> are basically like adding custom functionality on top of our config."

`webpack.config.js`:
```
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
```
```
{
  test: /\.scss$/,
  use: ExtractTextWebpackPlugin.extract({ // call plugin w/ extract method
    use: ['css-loader', 'sass-loader'], // use these loaders
    fallback: 'style-loader' // fallback for any CSS not extracted
  }) // end extract
}
```
```
plugins: [
  new ExtractTextWebpackPlugin('styles.css')
  // call the ExtractTextWebpackPlugin constructor and name our css file
]
```
"And we should end up with `styles.css` generated in our `public` directory."

`index.html`: add `<link rel="stylesheet" href="styles.css">` (webpack stylesheet output)

###(2) Set up local development server
Command line:
```
npm install webpack-dev-server -g --save-dev
```
(as of 1/9/18, need to do global install to get `webpack-dev-server` commands)

Add `devServer {}` object to `webpack.config.js`:
```
devServer: {
  contentBase: path.resolve(__dirname, './public'), // A directory or URL from which to serve HTML content.
  historyApiFallback: true, // fallback to /index.html for Single Page Applications.
  inline: true, // inline mode (set to false to disable including client scripts (like livereload))
  open: true // open default browser while launching
},
```
```
devtool: 'eval-source-map' // enable devtool for better debugging experience
```

###(3) Local dev server cont'd. - launch `webpack-dev-server` via NPM scripts
Replace `watch` with `start` script in `package.json`:
```
"start": "webpack-dev-server -d --hot --config webpack.config.js --watch",
```
Command line:
```
npm run start
```
WOW. The result here is very cool.
#### `npm run start`


# IV.
## see: https://codeburst.io/simple-beginner-guide-for-webpack-2-0-from-scratch-part-iv-102efc01ffad
"We have all of the main functionality already — but we want more, we’re going to boost up our performance and make our build production ready."

###(1) JS Minification - via `uglifyjs` webpack plugin
Command line:
```
npm i uglifyjs-webpack-plugin --save-dev
```

`webpack.config.js`:
```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // "uglify" our output js code
```
```
plugins: [
  new ExtractTextWebpackPlugin('styles.css'),
  new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
],
```
Test via command line:
```
rm -rf public/output.js
ls
webpack
cat public/output.js
```
"Uglify is a JavaScript file minifier. It compresses the file size by removing all the spaces and new lines- which makes the code unreadable able hence ugly. Uglify also joins sentences using comma, changes property access to dot notation (to reduce number of characters), removes dead code and removes console logs. it also simplifies conditional statements (if), Boolean operations, constants, function declarations etc." (Quora, "What does uglify mean?")

"It’s not very optimal to uglify each time after changes because of the added memory cost and compile time. We should only uglify on our production servers once we are going to push our code to live." (Lasn)

###(2) Node environments - specify thy development phase
`package.json`:
```
"scripts": {
  "build": "webpack",
  "start": "webpack-dev-server -d --hot --config webpack.config.js --watch",
  "production": "NODE_ENV=production webpack"
},
```

Test via command line:
```
npm run production
```

Append the "production behavior" to `webpack.config.js`:
```
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
  );
}
```
If production === true, use the UglifyJsPlugin.

To test:
First, remove `output.js`, then `npm run build`
Then, remove `output.js` and `npm run production`

Should get uglified code second but not first time.

###(3) CSS Minification - via `optimize-css-assets-webpack-plugin`
Command line:
```
npm i optimize-css-assets-webpack-plugin --save-dev
```
`webpack.config.js`:
At the top:
```
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
```
And at the bottom, append to production behavior:
```
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
    new OptimizeCSSAssets()
  );
}
```


# V.
## see: https://codeburst.io/simple-beginner-guide-for-webpack-2-0-from-scratch-part-v-495dba627718

###(0) Get organized
(a) create `assets` folder w/in `src`
`mkdir stylesheets, icons, images, fonts` within
Move `styles.scss` into `stylesheets` folder and update pathname in `index.js`

(b) create `app` folder w/in `src`
`touch App.jsx` in `app`

###(1) Images via React - part 1 - configs (`webpack.config.js`)
Command line: (may take a moment)
```
npm i image-webpack-loader file-loader --save-dev
```
`webpack.config.js`: add rules for (a) JSX loader and (b) image loader
```
within module.rules...
...

//(a) jsx loader
{
  test: /\.jsx$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
},

//(b) image loader
{
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: ['file-loader?context=src/assets/images&name=images/[path][name].[ext]', {
    loader: 'image-webpack-loader',
    query: {
      mozjpeg: {
        progressive: true,
      },
      gifsickle: {
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 4,
      },
      pngquant: {
        quality: '75-90',
        speed: 3,
      },
    },
  }],
  exclude: /node_modules/,
  include: __dirname,
},
```

###(2) Images via React - part 2 - hook up Babel
Command line:
```
npm i react react-dom babel-preset-react --save-dev
```
`.babelrc`:
```
{ "presets": [ "es2015", "react" ]}
```


###(3) Images via React - part 3 - boilerplate (`index.html`, `index.js`, `App.jsx`)
`index.html`: put react boilerplate into <body>
```
<body>

  <div id="root"></div> <!-- React stuff -->

  <script src="output.js"></script> <!-- webpack js output -->

</body>
```
`index.js`: React boilerplate
```
import React from 'react'; // main react dependency
import ReactDOM from 'react-dom'; // ReactDOM virtual DOM
import App from './app/App.jsx'; // main app component

// rendering the app component and mounting it to the #root element:
ReactDOM.render(<App />, document.getElementById('root'));
```

`App.jsx`: React boilerplate
"Pure stateless component" returning simple JSX
##### `App.jsx` -> `index.js` -> `index.html`

###(4) Images via React - part 4 - optimizations
- Supplement `App.jsx` to test image loading.

- If get intimidating webpack error regarding img loading (to effect of "image not found"), try: `brew reinstall libpng` (https://github.com/tcoopman/image-webpack-loader/issues/60)

To deal with "long import files" in `App.jsx` - e.g., `import satire from '../assets/images/koachbros.jpeg';`, use *aliases* in `webpack.config.js` by adding a `resolve` object (to the top-level `config` object):
```
resolve: {
  // auto-resolve certain extensions:
  extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'],

  // create aliases - e.g. "images" as an alias for src/assets/images
  alias: {
    images: path.resolve(__dirname, 'src/assets/images')
  }
},
```

- Hot-module-reloading `styles` loader:
Command line:
```
npm i css-hot-loader -D
```
(`-D === --save-dev`)

`webpack.config.js`:
```
// add to module.rules
{
  test: /\.scss$/,
  use: ['css-hot-loader'].concat(
    ExtractTextWebpackPlugin.extract({ // call plugin w/ extract method
      use: ['css-loader', 'sass-loader'], // use these loaders
      fallback: 'style-loader' // fallback for any CSS not extracted
    })  // end extract
  ),
},
```

- `postcss`:
(a) Dependencies via command line:
```
npm i -D autoprefixer postcss-loader
```
(b) `webpack.config.js`:
```
// update module.rules.test === /\.scss$/
...
fallback: 'style-loader'
use: ['css-loader', 'sass-loader', 'postcss-loader']
```
(c) `touch postcss.config.js`:
```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
(d) Amend `scripts` in `package.json` with `webpack --progress`:
```
"scripts": {
  "build": "webpack",
  "start": "webpack --progress && webpack-dev-server -d --hot --config webpack.config.js --watch",
  "production": "NODE_ENV=production webpack"
},
```
`npm run start` to test. (Try flex display or something in `styles.scss`.)


# VI.
## see: https://hackernoon.com/webpack-dashboard-with-create-react-app-vue-cli-and-custom-configs-49166e1a69de
Command line:
```
npm install webpack-dashboard --save-dev
```
`webpack.config.js`:
```
const DashboardPlugin = require('webpack-dashboard/plugin');
...
plugins: [
  new ExtractTextWebpackPlugin('styles.css'),
  new DashboardPlugin(), // <-- add this
],
```
`package.json`:
```
"scripts": {
  "build": "webpack --progress",
  "start": "webpack-dashboard -- webpack-dev-server -d --hot --config webpack.config.js --watch",
  "production": "NODE_ENV=production webpack"
},
```
Test w/ `npm run start`
