# Slack Webhook integration for Angular (v2+)

Feedback module that send message directly to Slack.

## Table of Contents

* [Demo](#demo)
* [Quick Start](#quick-start)
  + [Angular Version](#angular-version)
  + [Module Format](#module-format)
* [Simple Example](#simple-example)
* [Styling](#styling)
* [Server-Side Paging](#server-side-paging)
* [Multiple Instances](#multiple-instances)
* [Building from source](#building-from-source)
* [Building the docs](#building-the-docs)
* [License](#license)


## Demo

Check out the live demo here: 

## Quick Start

```
npm install ngx-slack --save
```

### Angular Version

This library is built to work with **Angular 2.3.0+**, and support ahead-of-time compilation.

### Module Format

This library ships as a "flat ES module" (FESM). This means that all the JavaScript code is located in a single ES5-compatible file, but makes use of ES2015 `import` and `export` statements.

Webpack, Systemjs and Rollup all support this format and should work without problems.

A UMD bundle is also provided for systems which do not support FESM.

## Simple Example

```TypeScript
// app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxSlackModule} from 'ngx-slack'; // <-- import the module
import {MyComponent} from './my.component';

@NgModule({
    imports: [
      BrowserModule,
      NgxSlackModule.initializeApp('https://hooks.slack.com/services/XXXXXXX/XXXXXXX/XXXXXXXXXXXXXXXXXXXXX'),
      ], // <-- include it in your app module
    declarations: [MyComponent],
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

```TypeScript
// my.component.ts
import {Component} from '@angular/core';

@Component({
    selector: 'my-component',
    template: `
    <p>
      Home works!!!
    </p>
       
    <ngx-slack-feedback messageTitle='Feedback from my App'></ngx-slack-feedback>
    `
})
export class MyComponent {}
```

## API

| Input | Default |
| --- | --- |
|  placeholder | 'Enter your feedback or question here'  |
|  successMessage | 'Thank you for your Feedback!'  |
|  buttonText | 'Send a Message'  |
|  buttonTextSending | 'Sending...'  |
|  messageTitle | 'Feedback from NgxSlack'  |

## Building from source

Requires globally-installed node (tested with v5.x) & npm. 

```
npm install
npm run test
npm run build 
```
`test` runs the Karma tests once. You can also use `test:watch` to keep tests running in watch mode.

`npm run build` creates an intermediate `/build` folder, but the final output of the lib (which gets published to npm) is in the `/dist` folder.

## License

MIT
