# Slack Webhooks integration for Angular (v2+)

![Slack](https://fst.slack-edge.com/66f9/img/icons/ios-114.png "Slack")


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

Check out the live demo here: http://ngx-slack-demo.surge.sh

Demo Slack channel: https://ngx-slack.slack.com/messages/C5DNU65UH

![Demo](https://media.giphy.com/media/26FmQTavFr58Hj7W0/giphy.gif "Demo")


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
      // This is demo url, replace it with your Slack Webhooks link.
      NgxSlackModule.initializeApp('https://hooks.slack.com/services/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'),
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
       
    <ngx-slack-feedback messageTitle='Feedback from my Demo App'></ngx-slack-feedback>
    `
})
export class MyComponent {}
```

## API

| Input | Default |
| --- | --- |
|  placeholder | Enter your feedback or question here  |
|  successMessage | Thank you for your Feedback!  |
|  buttonText | Send a Message  |
|  buttonTextSending | Sending... |
|  messageTitle | Feedback from NgxSlack  |
|  closeAfter | 2000  |


## Building from source

Requires globally-installed node (tested with v6.x) & npm. 

```
npm install
npm run build 
```
`test` runs the Karma tests once. You can also use `test:watch` to keep tests running in watch mode.

`npm run build` creates an intermediate `/dist` folder, but the final output of the lib (which gets published to npm) is in the `/dist` folder.

## License

MIT
