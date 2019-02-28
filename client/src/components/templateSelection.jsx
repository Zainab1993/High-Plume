import React, { Component } from "react";
import "../startup.css";
import $ from "jquery";
import axios from "axios";

var cat_info_db = [];
var questions_from_db = [];
var userDataTemp = [];
var catSection_name = "";
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}

class templateSelection extends Component {
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

  handleButtonClick(e) {
    debugger;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    debugger;
    var categoryInfo = [];
    axios
      .get("http://localhost:6003/createcategory/getcategoryInfoWithoutPara")
      .then(response => {
        console.log(response);
        categoryInfo = response.data.categoryLocalData;
      })
      .catch(err => {
        console.log(err.response);
      });

    axios
      .get("http://localhost:6003/category/getCategoryInformationWithoutPara")
      .then(response => {
        console.log(response);
        var divHtml = "";
        userDataTemp = response.data.categoryLocalData;
        var categorySections_name = [];

        // for (var j = 0; j < categoryInfo.length; j++) {
        //   if (categoryInfo[j].cat_id == userDataTemp[i]._id) {
        //     categorySections_name[j] = userDataTemp[j].section_name;
        //   }
        // }

        divHtml += "<thead  id='thead'>";
        divHtml += " <th  style='width:25%' id=''>ID</th>";
        divHtml += " <th style='width:25%'>Category Name</th>";

        divHtml += " <th  style='width:25%'>Action</th>";
        divHtml += "</thead><tbody id='tbody'>";
        for (var i = 0; i < userDataTemp.length; i++) {
          divHtml += "<tr>";
          divHtml +=
            "<th id='th3'  style='width:25%' >" + userDataTemp[i]._id + "</th>";

          divHtml +=
            " <td   style='width:25%'>" + userDataTemp[i].cat_name + "</td>";

          divHtml +=
            "<td  style='width:25% '><input class='radio text-center' type='radio' id='radiobtn' style='display: inline-block;' name='radiobtn' value='' ></input></td>";

          divHtml += "</tr>";
        }

        divHtml += "</tbody>";
        document.getElementById("tableSection").innerHTML = divHtml;
        document.getElementById("reg1").innerHTML = divHtml;
      })
      .catch(error => {
        console.log(error.response);
      });

    // $("#tableSection tbody tr").on("click", "#btnSelect", function() {
    //   debugger;
    //   var rowIndex = $(this).closest("tr");
    // });
  }

  onSubmit() {
    debugger;
    var checkedRows = [];

    $("#tbody tr").each(function() {
      if (
        $(this)
          .find("input")
          .is(":checked")
      ) {
        checkedRows.push(
          $(this)
            .find("td:eq(1)")
            .text()
        );
        console.log(checkedRows);
      }
    });

    const userData = {
      checkedRows: checkedRows
    };

    axios
      .post("http://localhost:6003/createTemplate/createTemplate", userData)
      .then(response => {
        console.log(response);
        this.props.history.push(`/admin`);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit1(e) {}

  render() {
    //goToTop();
    return (
      <div className="container">
        <nav className="main-menu">
          <ul>
            <li>
              <a href="/admin" style={{ marginTop: "30%" }}>
                <i class="fas fa-home fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Home</b>
                </span>
              </a>
            </li>

            <li style={{ marginTop: "10%" }}>
              <a href="/section">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section</b>
                </span>
              </a>
            </li>
            <li className="has-subnav" style={{ marginTop: "10%" }}>
              <a href="/category">
                <i class="fas fa-edit fa-2x" />
                <span className=" nav-text" style={{ color: "white" }}>
                  <b>Category</b>
                </span>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/templateselection">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Template</b>
                </span>
              </a>
            </li>

            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/registerCustomer">
                <i class="fas fa-user-plus fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Register User</b>
                </span>
              </a>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="/login">
                <i className="fa fa-power-off fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Logout</b>
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <h1>Create A Template</h1>
        <table
          className="table table-light"
          id="tableSection"
          style={{ marginTop: "5%" }}
        />

        <button
          type="button"
          name="savebtn"
          className="btn btn-primary"
          onClick={() => this.onSubmit()}
        >
          Save
        </button>
      </div>
    );
  }
}

export default templateSelection;
