# c3-react

## Purpose

* to compare reusable d3 libraries in react/flux architect based on the following perspectives

1. supported graph types

2. data-binding methods

3. data/component lifecycles

4. callback functions (interactivity)

5. implementation complexity

## How to install

  ```
  npm install c3-react
  ```

## How to use

  ```
  const C3Chart = require("./C3Chart.jsx");
  ```
  
* In parnet component
  ```
  <C3Chart data={data} type={type} options={options}/>
  ```

## How to run examples

  ```
  $ cd c3-react
  $ npm install 
  $ npm run dev
  ```

## Dependency
+ [C3.js](https://github.com/masayuki0812/c3) `<=0.4.10`
+ [D3.js](https://github.com/mbostock/d3) `<=3.5.0`

## License
MIT
