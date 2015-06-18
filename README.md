# c3-react

c3-react is a reusable react component for [c3](https://github.com/masayuki0812/c3) charts
[demo](http://terry81811.github.io/c3-react/build/#/c3)

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

* data example:
```
let data = [
  {
    key: "dataSource1"
    values: [
      {label: "A", value: 3},
      {label: "B", value: 4}
    ]
  },
  {
    key: "dataSource2"
    values: [
      {label: "X", value: 7},
      {label: "Y", value: 8}
    ]
  }
]
```

* supported types
```
let type = "bar" // {"line","bar","pie", "multiBar","lineBar"}
```

* options example
```
let options = {
  padding: {
    top: 20,
    bottom: 20,
    left: 40,
    right: 10
  },
  size: {
    width: 800,
    height: 600
  },
  subchart: true,
  zoom: true,
  grid: {
    x: false,
    y: true
  },
  labels: true,
  axisLabel: {
    x: "product",
    y: "quantity"
  },
  onClick: function(d) {
    let categories = this.categories(); //c3 function, get categorical labels
    console.log(d);
    console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
  }
};
```


## How to run examples

  ```
  $ cd c3-react
  $ npm install 
  $ npm run dev
  ```

## Release Note

+ 0.1.6 - provide compiled es5 module


## Dependency
+ [C3.js](https://github.com/masayuki0812/c3) `<=0.4.10`
+ [D3.js](https://github.com/mbostock/d3) `<=3.5.0`

## License
MIT
