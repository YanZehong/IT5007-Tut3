const initialIssues = [];

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, issue.phone), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()));
  }

}

class AddTraveller extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    let seatNum = Number(form.seat.value);

    if (seatNum >= 1 && seatNum <= 25) {
      const issue = {
        name: form.name.value,
        phone: form.phone.value,
        id: form.seat.value
      };
      this.props.createIssue(issue);
    } else {
      this.props.msgDisplay("Error: Invalid Seat Number");
    }

    form.name.value = "";
    form.phone.value = "";
    form.seat.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name",
      placeholder: "Name"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "phone",
      placeholder: "Phone"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "seat",
      placeholder: "Seat No."
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
  }

}

class DeleteTraveller extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    const form1 = document.forms.issueDelete;
    let seatNum1 = Number(form1.seatDel.value);

    if (seatNum1 >= 1 && seatNum1 <= 25) {
      const issueID = form1.seatDel.value;
      this.props.deleteIssue(issueID);
    } else {
      this.props.msgDisplayDel("Error: Invalid Seat Number");
    }

    form1.seatDel.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueDelete",
      onSubmit: this.handleDelete
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "seatDel",
      placeholder: "Seat No."
    }), /*#__PURE__*/React.createElement("button", null, "Delete"));
  }

}

class DisplayTraveller extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    }));
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Seat No."), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone Number"), /*#__PURE__*/React.createElement("th", null, "Timestamp"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
  }

}

class DisplaySeat extends React.Component {
  render() {
    const seatDict = this.props.seatDict;
    var seats = [];

    for (let rr = 0; rr < 5; rr++) {
      var temps = {
        rowid: rr,
        cols: [],
        colors: []
      };

      for (let cc = 1; cc < 6; cc++) {
        let checkNum = rr * 5 + cc;
        temps.cols.push(checkNum);

        if (seatDict[checkNum] == "Available") {
          temps.colors.push("lightgrey");
        } else {
          temps.colors.push("lightcoral");
        }
      }

      seats.push(temps);
    }

    return /*#__PURE__*/React.createElement("table", {
      id: "sTable"
    }, /*#__PURE__*/React.createElement("thead", null), /*#__PURE__*/React.createElement("tbody", null, seats.map(seat => /*#__PURE__*/React.createElement("tr", {
      key: seat.rowid
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "center",
        background: seat.colors[0]
      }
    }, seat.cols[0]), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "center",
        background: seat.colors[1]
      }
    }, seat.cols[1]), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "center",
        background: seat.colors[2]
      }
    }, seat.cols[2]), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "center",
        background: seat.colors[3]
      }
    }, seat.cols[3]), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "center",
        background: seat.colors[4]
      }
    }, seat.cols[4])))));
  }

}

class DisplayHomepage extends React.Component {
  constructor() {
    super();
    this.state = {
      routes: 1,
      issues: [],
      seatDict: {}
    };
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.msgDisplay = this.msgDisplay.bind(this);
    this.msgDisplayDel = this.msgDisplayDel.bind(this);
    this.handleAddTra = this.handleAddTra.bind(this);
    this.handleDelTra = this.handleDelTra.bind(this);
    this.handleDispRes = this.handleDispRes.bind(this);
    this.handleDispSeat = this.handleDispSeat.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var initialDict = {};

    for (let k = 1; k < 26; k++) {
      initialDict[k] = "Available";
    }

    setTimeout(() => {
      this.setState({
        issues: initialIssues,
        seatDict: initialDict
      });
    }, 500);
  }

  createIssue(issue) {
    issue.created = new Date();
    let seatNum = Number(issue.id);
    const updateSeatDict = this.state.seatDict;

    if (updateSeatDict[seatNum] == "Available") {
      const newIssueList = this.state.issues.slice();
      newIssueList.push(issue);
      this.setState({
        issues: newIssueList
      });
      updateSeatDict[seatNum] = "Occupied";
      this.setState({
        seatDict: updateSeatDict
      });
      this.msgDisplay("Successful");
    } else {
      this.msgDisplay("Occupied Seat");
    }
  }

  deleteIssue(issueID) {
    const newIssueList = this.state.issues.slice();
    const updateIssueList = [];
    const updateSeatDictDel = this.state.seatDict;
    let seatNumDel = Number(issueID);

    if (updateSeatDictDel[seatNumDel] == "Occupied") {
      for (let i = 0; i < this.state.issues.length; i++) {
        if (newIssueList[i].id == issueID) {
          continue;
        }

        updateIssueList.push(newIssueList[i]);
      }

      updateSeatDictDel[seatNumDel] = "Available";
      this.setState({
        issues: updateIssueList,
        seatDict: updateSeatDictDel
      });
      this.msgDisplayDel("Successful Cancel");
    } else {
      this.msgDisplayDel("Not found! No need to delete");
    }
  }

  msgDisplay(msg) {
    const msgDisp = document.getElementById("msgDisplay");
    msgDisp.textContent = msg;
  }

  msgDisplayDel(msg) {
    const msgDispDel = document.getElementById("msgDisplayDel");
    msgDispDel.textContent = msg;
  }

  handleAddTra(e) {
    e.preventDefault();
    this.setState({
      routes: 1
    });
  }

  handleDelTra(e) {
    e.preventDefault();
    this.setState({
      routes: 2
    });
  }

  handleDispRes(e) {
    e.preventDefault();
    this.setState({
      routes: 3
    });
  }

  handleDispSeat(e) {
    e.preventDefault();
    this.setState({
      routes: 4
    });
  }

  render() {
    if (this.state.routes == 1) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Singapore Railway System"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleAddTra
      }, "Add Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDelTra
      }, "Delete Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispRes
      }, "Display Reservation"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispSeat
      }, "Display Seats"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddTraveller, {
        createIssue: this.createIssue,
        msgDisplay: this.msgDisplay
      }), /*#__PURE__*/React.createElement("p", {
        id: "msgDisplay"
      }));
    } else if (this.state.routes == 2) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Singapore Railway System"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleAddTra
      }, "Add Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDelTra
      }, "Delete Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispRes
      }, "Display Reservation"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispSeat
      }, "Display Seats"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DeleteTraveller, {
        deleteIssue: this.deleteIssue,
        msgDisplayDel: this.msgDisplayDel
      }), /*#__PURE__*/React.createElement("p", {
        id: "msgDisplayDel"
      }));
    } else if (this.state.routes == 3) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Singapore Railway System"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleAddTra
      }, "Add Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDelTra
      }, "Delete Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispRes
      }, "Display Reservation"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispSeat
      }, "Display Seats"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DisplayTraveller, {
        issues: this.state.issues
      }));
    } else {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Singapore Railway System"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleAddTra
      }, "Add Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDelTra
      }, "Delete Traveller"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispRes
      }, "Display Reservation"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleDispSeat
      }, "Display Seats"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DisplaySeat, {
        seatDict: this.state.seatDict
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
        id: "Ltable"
      }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
        style: {
          background: "lightgrey"
        }
      }, "Available"), /*#__PURE__*/React.createElement("td", {
        style: {
          background: "lightcoral"
        }
      }, "Occupied"))))));
    }
  }

}

const element = /*#__PURE__*/React.createElement(DisplayHomepage, null);
ReactDOM.render(element, document.getElementById('contents'));