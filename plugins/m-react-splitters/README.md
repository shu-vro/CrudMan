# Splitters for React

<i>v. 1.2.0</i>

**New version changes**

* fixed [issue](https://github.com/martinnov92/React-Splitters/issues/15)

<i>v. 1.1.0</i>

**New version changes**

* fixed issue with `getBoundingClientRect` in React 16

[NPM](https://www.npmjs.com/package/m-react-splitters)

[Demo](https://martinnov92.github.io/React-Splitters/)

Install: `npm install --save m-react-splitters` 

---------

Splitters for React has been written in TypeScript.

This splitter supports touch screens.

There are two options how the splitter can work.
You can either select to resize splitters as you are holding and dragging the handlebar, or you can
postponed the resize.

Splitters can be nested, but you have to specify what positions (vertical / horizontal) are they going to be and their sizes.

Left pane's (primary) width is calculated by `JavaScript`, the other panel's width is set by `CSS`.

Usage in your projects:
Please import splitters like this:

```
import Splitter from 'm-react-splitters';
import 'm-react-splitters/lib/splitters.css';
```

Vertical splitter
```js
primaryPaneMinWidth={number}
primaryPaneMaxWidth="string" (% or px)
primaryPaneWidth="string" (% or px)
```

Vertical splitter
```js
primaryPaneMinWidth={number}
primaryPaneMaxWidth="string" (% or px)
primaryPaneWidth="string" (% or px)
```

Horizontal splitter
```js
primaryPaneMinHeight={number}
primaryPaneMaxHeight="string" (% or px)
primaryPaneHeight="string" (% or px)
```

Another options for splitter are:

* `postPoned`: Boolean

    * this specifies how the resize will work
    * default is false 

* `className`: string 
* `primaryPaneClassName`: string
* `secondaryPaneClassName`: string
* `dispatchResize`: Boolean
    
    * This dispatch resize event, it is meant for other components which resize on window resize
    * it's something like temporary callback function
    * Default is false

    * or you can use:
        
        `onDragFinished`: function

* `maximizedPrimaryPane`: Boolean
* `minimalizedPrimaryPane`: Boolean

```tsx
<Splitter
    position="horizontal"
    primaryPaneMaxHeight="80%"
    primaryPaneMinHeight={0}
    primaryPaneHeight="400px"
    dispatchResize={true}
    postPoned={true}
>    
    <Splitter
        position="vertical"
        primaryPaneMaxWidth="80%"
        primaryPaneMinWidth={0}
        primaryPaneWidth="400px"
        postPoned={false}
    >    
        <div></div>
        <div></div>
    </Splitter> 
    <div></div>
</Splitter> 
```