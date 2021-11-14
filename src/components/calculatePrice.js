import React, { Component } from "react";
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
    this.resultref = utilizeScroll();
    this.calculateRef = utilizeScroll();
    this.scrollToCalculate = this.scrollToCalculate.bind(this);
    this.state = {
      weight: "",
      height: "",
      depth: "",
      width: "",
      price: null,
      resultCode: "",
      resultMessage: "",
      companyName: "",
      calculated: false,
      showLoadingBar: false,
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
  scrollToCalculate(e) {
    this.calculateRef.executeScroll();
  }

  calculatePrice() {
    let width = this.state.width === "" ? 0 : this.state.width;
    let height = this.state.height === "" ? 0 : this.state.height;
    let depth = this.state.depth === "" ? 0 : this.state.depth;
    let weight = this.state.weight === ""  ? 0 : this.state.weight;

    let data = {
      Width: width,
      Height: height,
      Depth: depth,
      Weight: weight,
    };
    this.setState({ showLoadingBar: true });
    this.props
      .calculatePrice(data)
      .then((data) => {
        this.setState({
          resultCode: data.resultCode,
          resultMessage: data.resultMessage,
          companyName: data.companyName,
          price: data.price,
          calculated: true,
          showLoadingBar: false,
        });
        if(data.resultCode === 200){
        this.resultref.executeScroll();
      }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ showLoadingBar: false });
      });
  }

  render() {
    const results = this.props;
    const { showLoadingBar } = this.state;
    return (
      <div>
        <div className="hero is-warning is-large">
          <div className="hero-body">
            <div className="columns  is-centered">
              <div className="column is-half" id="columnIsHalf">
                <h1 className="title is-1">Do you want to send item easily?</h1>
                <p className="subtitle">Let's click the below</p>
                <button
                  onClick={this.scrollToCalculate}
                  className="button button is-info is-light"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <br />
          <h1 className="title is-1" ref={this.calculateRef.elRef}>
            Cargo Price Calculation & Order Tool
          </h1>

          <div id ="calculate" className="form box  is-warning" >
            {this.state.calculated &&
            results.calculatedResults.calculatedResults.resultCode === 422 ? (
              <div class="notification is-danger">
                Please fill the form correctly
              </div>
            ) : (
              ""
            )}
            <div className="columns">
              <div className="column is-two-fifths">
                <div className="field">
                  <h5 className="title is-5">Weight</h5>
                  <label className="label"></label>
                  <input
                    className="input is-warning"
                    type="number"
                    placeholder="Please enter the Weight"
                    required
                    onChange={this.onChangeWeight}
                  />
                </div>
              </div>
              <div className="column">
                <div className="field ">
                  <h5 className="title is-5">Dimension</h5>
                  <label className="label">Height</label>
                  <input
                    className="input is-warning"
                    type="number"
                    placeholder="Please enter the Height"
                    required
                    onChange={this.onChangeHeight}
                  />
                </div>
                <div className="field">
                  <label className="label">Width</label>
                  <input
                    className="input is-warning"
                    type="number"
                    placeholder="Please enter the Width"
                    required
                    onChange={this.onChangeWidth}
                  />
                </div>
                <div className="field">
                  <label className="label">Depth</label>
                  <input
                    className="input is-warning"
                    type="number"
                    placeholder="Please enter the Depth"
                    required
                    onChange={this.onChangeDepth}
                  />
                </div>
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <button
                type="button"
                onClick={this.calculatePrice}
                className="button is-info"
              >
                Calculate
              </button>
            </div>
          </div>
          {showLoadingBar ? (
            <progress
              className="progress is-small is-warning"
              max="100"
            ></progress>
          ) : (
            ""
          )}
          <div ref={this.resultref.elRef}>
            {this.state.calculated ? (
              results.calculatedResults.calculatedResults.resultCode === 200 ? (
                <div id="result">
                  <h1 className="title is-1">Offer & Pay</h1>
                  <div className="field box">
                    <div className="columns">
                      <div className="column"></div>
                      <div className="column">
                        <h1 className="title is-1">Company Name</h1>
                        <h1 className="title is-1">
                          {
                            results.calculatedResults.calculatedResults
                              .companyName
                          }
                        </h1>
                        <h1 className="title is-1">Price</h1>
                        <h1 className="title is-1">
                          {results.calculatedResults.calculatedResults.price} €
                        </h1>
                        <button
                          className="button is-info"
                        >
                          Easy Pay & Send
                        </button>
                      </div>
                      <div className="column"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="field box">
                  <div className="columns is-centered">
                    <div className="column">
                      <h1 className="title is-1">
                        {
                          results.calculatedResults.calculatedResults
                            .resultMessage
                        }
                      </h1>
                    </div>
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calculatedResults: state.calculatedResults,
  };
};
const utilizeScroll = () => {
  const elRef = React.createRef();
  const executeScroll = () => elRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

  return { executeScroll, elRef };
};

export default connect(
  mapStateToProps,
  { calculatePrice }
)(CalculatePrice);
