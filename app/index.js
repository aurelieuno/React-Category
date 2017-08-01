var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
import _ from "lodash"

class SearchBar extends React.Component {

  render() {
    return (
      <div>
      <form className ="form-inline" onSubmit={this.props.handleSubmit}>
        <input className = "form-control mr-sm-2"
        type="text"
        name="filtervalue"
        placeholder="Search"
        value={this.props.state.filtervalue}
        onChange={this.props.handleChange} />
        <p>
        <input
        type="checkbox"
        name="checkbox"
        checked= {this.props.state.checkbox}
        onChange= {this.props.handleChange} />
        Show Products only in stock
        </p>
      </form>

      </div>
    )
  }
}

class ProductRow extends React.Component {
  render() {

    return (
       <div>
        <ProductCategoryRow products = {this.props.products}/>
      </div>
    )
  }
}

class ProductCategoryRow extends React.Component {
  render() {

    return (
      <tr>
        <tr>
        <th>Product</th>
        <th>Price</th>
        </tr>
      {this.props.products.map(e => {
        if (this.props.filtervalue === null && this.props.checkbox ===false) {
        <tr>
        <td>{e.name}</td>
        <td>{e.price}</td>
        </tr>
      } else if (_.startsWith(e.name, this.props.filtervalue)) {
        <tr>
        <td>{e.name}</td>
        <td>{e.price}</td>
        </tr>
      }
      })}
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const products = this.props.products;
    const cat = this.props.products.map(e=>e.category);
    const category = _.uniq(cat);
    console.log(category);

    return (
       <div>

      {category.map(e =>
        <table className="table table-inverse">
        <thead>
        <tr>
        <th>{e}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <ProductRow products = {_.filter(products, function (el){
          return el.category===e
        })} state={this.props.state}/>
        </tr>
        </tbody>
        </table>
           )}

      </div>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtervalue:null,
      checkbox:true
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === "text"? target.value: target.checked;
    const name = target.name;
    this.setState({
      [name] : value
      });
  }

    handleSubmit(event){
       event.preventDefault();
    }

  render() {

    return (
      <div className = "container">
      <SearchBar state={this.state} handleChange={this.handleChange}/>
      <ProductTable state={this.state} products = {this.props.products}/>
      </div>
    )
  }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Sporting Goods', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Hardware', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Hardware', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Indemnity', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Indemnity', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Sporting Goods', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('app')
);