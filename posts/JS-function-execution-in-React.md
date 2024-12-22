---
title: JS function execution in React
date: 2024-12-21
tags:
  - JavaScript
  - React
---
When I was learning React, I would code the click event like this:
```jsx
<button onClick={console.log("test")}>
Click me!
</button>
```
I naturally thought it would print the string every time we clicked the button. But I was wrong - it  printed the string during the rendering of the button and did nothing when we clicked the button.

Why? What's going on behind this?

The code above is JSX(JavaScript XML), a syntax extension to JavaScript that allow developers to write HTML-like makeup inside JavaScript files. During rendering, that code is complied to:
```javascript
React.createElement( 
	"button", 
	{ onClick: console.log("test") }, // This executes and returns undefined 
	"Click me!" );
```

When React evaluates the `createElement` , it processes all props inside it. So the `onClick: console.log("test")` gets executed immediately and returns `undefined`, which become the event handler linked to the `onClick`.

In the browser DOM and JavaScript engine, it looks like this:

```html
<!-- In DOM --> <button>Click me!</button> 
```
```javascript
<!-- In JavaScript engine --> 
button.addEventListener('click', undefined);
```

This explains why `console.log("test")` is executed only once during page rendering and doesn't work when we click the button.

The correct way is:
```jsx
<button onClick={ () => {console.log("test")} }>
Click me!
</button>
```
Now it's not a command; it's a function reference.