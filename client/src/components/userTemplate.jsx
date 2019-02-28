import React, { Component } from "react";
import "../startup.css";
import $ from "jquery";
import axios from "axios";
var cat_info_db = [];
var questions_from_db = [];
var userDataTemp = [];

function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class userTemplate extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      cat_name: "",
      question: ""
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    debugger;
    var tempType = sessionStorage.getItem("userTempType");

    axios
      .get("http://localhost:6003/createTemplate/getTemplateInfo")
      .then(response => {
        console.log(response);
        var divHtml = "";
        userDataTemp = response.data.templateLocalData;
        for (var i = 0; i < userDataTemp.length; i++) {
          if (tempType == userDataTemp[i].Template_cat_name) {
            divHtml +=
              "<input id='tab1' type='radio' name='tabs' defaultChecked='true' />";
            divHtml +=
              "<label htmlFor='tab1'>" +
              userDataTemp[i].section_name +
              "</label>";
          }
        }
        document.getElementById("reg1").innerHTML = divHtml;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onSubmit() {}
  onSubmit1(e) {}

  render() {
    //goToTop();
    return (
      <div style={{ paddingTop: "5%" }} className="container">
        <div className="overlay">
          <div id="loading-img" />
        </div>
        <h1 style={{ fontSize: "55px" }}>Startup Questions</h1>

        <form noValidate onSubmit={this.onSubmit}>
          <div style={{ padding: "4%" }}>
            <div
              style={{ alignContent: "center" }}
              id="reg1"
              className="register"
            >
              <section id="content1">
                <div className="col-md-8">
                  <div
                    style={{ paddingLeft: "40%" }}
                    className="input-group mb-3"
                  >
                    <div className="input-group-prepend">
                      <span className="input-group-text">Category Name</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      name="cat_name"
                      value={this.state.cat_name}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row col-md-12">
                  <div
                    style={{ paddingTop: "8%", float: "left" }}
                    className="col-md-5"
                  >
                    <select
                      name="questions"
                      id="undo_redo"
                      className="form-control"
                      size="10"
                      multiple="multiple"
                      style={{ overflow: "scroll" }}
                      value={this.state.questions}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    style={{ paddingTop: "9.5%", paddingLeft: "8%" }}
                    className="col-md-2"
                  >
                    <button
                      type="button"
                      id="undo_redo_rightAll"
                      className="btn btn-block"
                    >
                      <i className="fas fa-forward" />
                      {/* <i className="glyphicon glyphicon-forward" /> */}
                    </button>
                    <button
                      type="button"
                      id="undo_redo_rightSelected"
                      className="btn btn-block"
                    >
                      <i className="fas fa-chevron-right" />
                      {/* <i className="glyphicon glyphicon-chevron-right" /> */}
                    </button>
                    <button
                      type="button"
                      id="undo_redo_leftSelected"
                      className="btn btn-block"
                    >
                      <i className="fas fa-chevron-left" />
                      {/* <i className="glyphicon glyphicon-chevron-left" /> */}
                    </button>
                    <button
                      type="button"
                      id="undo_redo_leftAll"
                      className="btn btn-block"
                    >
                      <i className="fas fa-backward" />
                      {/* <i className="glyphicon glyphicon-backward" /> */}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.onSubmit()}
                      style={{ marginTop: "67%" }}
                    >
                      Save
                    </button>
                  </div>
                  <div
                    style={{
                      paddingTop: "8%",
                      paddingLeft: "7%",
                      float: "right"
                    }}
                    className="col-md-5"
                  >
                    <select
                      name="to"
                      id="undo_redo_to"
                      className="form-control"
                      size="10"
                      multiple="multiple"
                      style={{ overflow: "scroll" }}
                      onChange={this.getSelectValue}
                    />
                  </div>
                </div>
              </section>

              <section id="content2">
                <div className="promos">
                  <div className="row col-md-12">
                    <div
                      className="input-group mb-3"
                      style={{ paddingTop: "20%" }}
                    >
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default"
                        >
                          Write your question here
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        name="question"
                        value={this.state.question}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.onSubmit1()}
                  >
                    Save
                  </button>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default userTemplate;
