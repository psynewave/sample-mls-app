# React MLSData Sample App

A basic project for using [react-mlsdata component](https://github.com/psynewave/react-mlsdata) in a react app.

## Getting Started

```bash
git clone https://github.com/psynewave/sample-mls-app.git
cd sample-mls-app
npm install
npm start
open http://localhost:3000
```

## Folder Structure

After creation, your project should look like this:

```
sample-mls-app/
  README.md
  index.html
  favicon.ico
  node_modules/
  package.json
  src/
    css/
      App.css
      index.css
    App.js
    index.js
```

For the project to build, **these files must exist with exact filenames**:

* `index.html` is the page template;
* `favicon.ico` is the icon you see in the browser tab;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.  
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

You can, however, create more top-level directories.  
They will not be included in the production build so you can use them for things like documentation.

## CSS Frameworks 

To speed the creation of apps yet not over burden a project with heavy frameworks two modern light frameworks have been included. You can remove the frameworks from the build by editing the index.css file in the src/css directory. Simply comment out the imports and substitute your preferred framework.

### More Info On CSS frameworks

* [Bulma Docs](http://bulma.io/documentation/components/card/)
* [BassCss](http://basscss.com/#getting-started)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.