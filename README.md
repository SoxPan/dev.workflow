# dev.workflow
BEMIT Workflow &amp; Gulpjs

# Gulp Tasks
- `gulp sass`
	- DEVELOPMENT: [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps), [sass](https://www.npmjs.com/package/gulp-sass), [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer), [debug](https://www.npmjs.com/package/gulp-debug), [size](https://www.npmjs.com/package/gulp-size), [notify](https://www.npmjs.com/package/gulp-notify)
	- PRODUCTION: [sass](https://www.npmjs.com/package/gulp-sass), [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer), [concat](https://www.npmjs.com/package/gulp-concat), [cssnano](https://www.npmjs.com/package/gulp-cssnano), [rename](https://www.npmjs.com/package/gulp-rename), [debug](https://www.npmjs.com/package/gulp-debug), [size](https://www.npmjs.com/package/gulp-size), [notify](https://www.npmjs.com/package/gulp-notify)
- `gulp html`
	- ALL: [includer](https://www.npmjs.com/package/gulp-x-includer), [prettify](https://www.npmjs.com/package/gulp-html-prettify), [debug](https://www.npmjs.com/package/gulp-debug), [size](https://www.npmjs.com/package/gulp-size), [notify](https://www.npmjs.com/package/gulp-notify)

- `gulp optimize`
	- ALL: [uncss](https://www.npmjs.com/package/gulp-uncss)
- `gulp critical`
	- ALL: [critical](https://www.npmjs.com/package/critical), [rename](https://www.npmjs.com/package/gulp-rename)
- `gulp publish`


- `gulp sass:watch`
- `gulp watch:html`

# Flags
- `--production`
