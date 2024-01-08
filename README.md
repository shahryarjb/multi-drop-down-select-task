The MultiSelect can accept some callback functions to re-bind a form or make value for local state For example

```javascript
<MultiSelect send={aFunction} />
```

Usually, I never isolate it to create a select box that has a limited number of elements and rerendering does not cause performance issues, but I did this for this task.

## Install and Run dev with npm

```
npm install
npm run dev
npm run build
```

## Install and Run dev with bun

```
bun install
bun run bun-dev
bun run bun-build
```
