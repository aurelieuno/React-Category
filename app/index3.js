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
class Product2 extends React.Component {
  render() {
    const products = this.props.products;

    return (
      <div>
        <tr>
        <th>Product</th>
        <th>Price</th>
        </tr>
      {products.map(e =>
        <tr>
        <td>{e.name}</td>
        <td>{e.price}</td>
        </tr>
      )}
      </div>
    )
  }
}

class Product1 extends React.Component {
  render() {
    const products = this.props.products;

    return (
      <div>
        <tr>
        <th>Product</th>
        <th>Price</th>
        </tr>
      {products.map(e =>
        <tr>
        <td>{_.startsWith(e.name.toLowerCase(),this.props.state.filtervalue.toLowerCase()) ? e.name : ""}</td>
        <td>{_.startsWith(e.name.toLowerCase(),this.props.state.filtervalue.toLowerCase()) ? e.price : ""}</td>
        </tr>
      )}
      </div>
    )
  }
}
class ProductCategoryRow extends React.Component {
  render() {
    const products = this.props.products;

    return (
      <div>
      {this.props.state.filtervalue ? <Product1 products={this.props.products} state ={this.props.state}/> : <Product2 products={this.props.products} state ={this.props.state}/>}
      </div>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const products = this.props.products;
    console.log(this.props.state)

    var array = "";
    if (this.props.state.checkbox) {
        array = (_.filter(products, function (el){
            return el.stocked ===true;
        }))
    } else {array= products}
    console.log(array)

    const cat = array.map(e=>e.category);
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

        <ProductCategoryRow products = {_.filter(array, function (el){
          return el.category===e
        })} state={this.props.state}/>

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
      checkbox:false
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
  {category: 'Hardware', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Hardware', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Hardware', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Hardware', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Hardware', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Indemnity', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Indemnity', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: false, name: 'Nexus 7'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Hardware', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Hardware', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Hardware', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Indemnity', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Indemnity', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: false, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('app')
);