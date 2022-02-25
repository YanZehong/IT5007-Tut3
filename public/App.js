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
    const issue = {
      name: form.name.value,
      phone: form.phone.value,
      id: form.seat.value
    };
    this.props.createIssue(issue);
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
    const issueID = form1.seatDel.value;
    this.props.deleteIssue(issueID);
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

class DisplayHomepage extends React.Component {
  constructor() {
    super();
    this.state = {
      routes: 1,
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.handleAddTra = this.handleAddTra.bind(this);
    this.handleDelTra = this.handleDelTra.bind(this);
    this.handleDispRes = this.handleDispRes.bind(this);
    this.handleDispSeat = this.handleDispSeat.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        issues: initialIssues
      });
    }, 500);
  }

  createIssue(issue) {
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({
      issues: newIssueList
    });
  }

  deleteIssue(issueID) {
    const newIssueList = this.state.issues.slice();
    const updateIssueList = [];

    for (let i = 0; i < this.state.issues.length; i++) {
      if (newIssueList[i].id == issueID) {
        continue;
      }

      updateIssueList.push(newIssueList[i]);
    }

    this.setState({
      issues: updateIssueList
    });
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
        createIssue: this.createIssue
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
        deleteIssue: this.deleteIssue
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
      }, "Display Seats"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DisplayTraveller, {
        issues: this.state.issues
      }));
    }
  }

}

const element = /*#__PURE__*/React.createElement(DisplayHomepage, null);
ReactDOM.render(element, document.getElementById('contents'));