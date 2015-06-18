const React = require("react");
let DocIndex = React.createClass({
  displayName: "DocComponent",
  render: function () {
    //sample options
    return (
      <div>
        <h1>Documentations</h1>
        <p>will be available soon. For now, please check <a href="https://github.com/terry81811/c3-react">source</a></p>
      </div>
    );
  }
});
module.exports = DocIndex;
