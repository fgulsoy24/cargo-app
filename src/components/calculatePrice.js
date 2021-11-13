import React, { Component } from "react";
import cargoService from "../services/cargoService";
import { calculatePrice } from "../actions/calculatePriceAction";
import { connect } from "react-redux";
import "../App.css";
class CalculatePrice extends Component {
  constructor(props) {
    super(props);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeDepth = this.onChangeDepth.bind(this);
    this.onChangeWidth = this.onChangeWidth.bind(this);

    this.calculatePrice = this.calculatePrice.bind(this);

    this.state = {
      weight: null,
      height: null,
      depth: null,
      width: null,
      price: null,
      resultCode: "",
      resultMessage: "",
      companyName: "",
      calculated: false,
    };
  }
  onChangeWeight(e) {
    this.setState({
      weight: e.target.value,
    });
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value,
    });
  }
  onChangeDepth(e) {
    this.setState({
      depth: e.target.value,
    });
  }
  onChangeWidth(e) {
    this.setState({
      width: e.target.value,
    });
  }

  calculatePrice() {
    let data = {
      Width: this.state.width,
      Height: this.state.height,
      Depth: this.state.depth,
      Weight: this.state.weight,
    };
  //  var validationResult = data.forEach(element => {
     // element.Width == null ? false;
      
    //});
    this.props
      .calculatePrice(data)
      .then((data) => {
        this.setState({
          resultCode: data.resultCode,
          resultMessage: data.resultMessage,
          companyName: data.companyName,
          price: data.price,
          calculated: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const results = this.props;
    return (
      <div class="container main">
      <br/>
      <h1 class="title is-1">Cargo Price Calculation & Order Tool</h1>
        <div className="form box">
          <div class="columns">
            <div class="column is-two-fifths">
              <div class="field">
                <label class="label">Weight</label>
                <input
                  class="input is-primary"
                  type="number"
                  placeholder="Please enter the Weight"
                  required
                  value={this.state.weight}
                  onChange={this.onChangeWeight}
                />
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Height</label>
                <input
                  class="input is-primary"
                  type="number"
                  placeholder="Please enter the Height"
                  required
                  value={this.state.height}
                  onChange={this.onChangeHeight}
                />
              </div>
              <div class="field">
                <label class="label">Width</label>
                <input
                  class="input is-primary"
                  type="number"
                  placeholder="Please enter the Width"
                  required
                  value={this.state.width}
                  onChange={this.onChangeWidth}
                />
              </div>
              <div class="field">
                <label class="label">Depth</label>
                <input
                  class="input is-primary"
                  type="number"
                  placeholder="Please enter the Depth"
                  required
                  value={this.state.depth}
                  onChange={this.onChangeDepth}
                />
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
          <button onClick={this.calculatePrice} className="button button is-primary">
            Calculate
          </button>
          </div>
        </div>
        {this.state.calculated? (
          results.calculatedResults.calculatedResults.resultCode === 200 ? (
          <div id = "results">
          <h1 class="title is-1">Orders</h1>
            <div class="field box">
              <div class="columns">
                <div class="column"></div>
                <div class="column">
                <h1 class="title is-1">Company Name</h1>
                <h1 class="title is-1">
                    {results.calculatedResults.calculatedResults.companyName} 
                  </h1>
                  <h1 class="title is-1">Price</h1>
                  <h1 class="title is-1">
                    {results.calculatedResults.calculatedResults.price} €
                  </h1>
                  <button onClick={this.calculatePrice} className="button button is-primary" >
                    Easy Pay & Send
                  </button>
                </div>
                <div class="column"></div>
              </div>
            </div>
          </div>
          ) : (
            <div class="field box">
              <div class="columns is-centered">
        <div class="column">
            <h1 class="title is-1">{results.calculatedResults.calculatedResults.resultMessage}</h1>
            </div>
            </div>

            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    calculatedResults: state.calculatedResults,
  };
};

export default connect(
  mapStateToProps,
  { calculatePrice }
)(CalculatePrice);
