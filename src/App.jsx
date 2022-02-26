const initialIssues = [];

function hasNumber(myString) {
  return /\d/.test(myString);
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.name}</td>
        <td>{issue.phone}</td>
        <td>{issue.created.toDateString()}</td>
      </tr>
    );
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
    let seatNum = Number(form.seat.value)
    if (seatNum>=1 && seatNum<=25){
      const issue = {
        name: form.name.value, phone: form.phone.value, id: form.seat.value,
      }
      this.props.createIssue(issue);
    }
    else {
      this.props.msgDisplay("Error: Invalid Seat Number");
    }
    form.name.value = ""; form.phone.value = ""; form.seat.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="phone" placeholder="Phone" />
	      <input type="text" name="seat" placeholder="Seat No." />
        <button>Add</button>
      </form>
    );
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
    return (
      <form name="issueDelete" onSubmit={this.handleDelete}>
	      <input type="text" name="seatDel" placeholder="Seat No." />
        <button>Delete</button>
      </form>
    );
  }
}

class DisplayTraveller extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Seat No.</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
  }
}

class DisplayHomepage extends React.Component {
  constructor() {
    super();
    this.state = { routes: 1, issues: [], seatDict: {} };
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.msgDisplay = this.msgDisplay.bind(this);
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
    for (let k=1; k<26; k++) {
      initialDict[k] = "Available";
    }
    setTimeout(() => {
      this.setState({ issues: initialIssues, seatDict: initialDict });
    }, 500);
  }

  createIssue(issue) {
    issue.created = new Date();
    let seatNum = Number(issue.id)
    const updateSeatDict = this.state.seatDict;
    if (updateSeatDict[seatNum]=="Available") {
      const newIssueList = this.state.issues.slice();
      newIssueList.push(issue);
      this.setState({ issues: newIssueList });
      updateSeatDict[seatNum] = "Occupied";
      this.setState({ seatDict: updateSeatDict });
      this.msgDisplay("Successful");
    }
    else {
      this.msgDisplay("Occupied Seat");
    }
  }

  deleteIssue(issueID) {
    const newIssueList = this.state.issues.slice();
    const updateIssueList = [];
    for (let i=0; i<this.state.issues.length; i++) {
      if (newIssueList[i].id == issueID) {
        continue;
      }
      updateIssueList.push(newIssueList[i])
    }
    this.setState({ issues: updateIssueList });
  }

  msgDisplay(msg) {
    const msgDisp = document.getElementById("msgDisplay");
    msgDisp.textContent=msg;
  }

  handleAddTra(e) {
    e.preventDefault();
    this.setState({ routes: 1 });
  }

  handleDelTra(e) {
    e.preventDefault();
    this.setState({ routes: 2 });
  }

  handleDispRes(e) {
    e.preventDefault();
    this.setState({ routes: 3 });
  }

  handleDispSeat(e) {
    e.preventDefault();
    this.setState({ routes: 4 });
  }

  render() {
    if (this.state.routes == 1)
    {
      return (
        <React.Fragment>
          <h1>Singapore Railway System</h1>
            <button onClick={this.handleAddTra}>Add Traveller</button>
            <button onClick={this.handleDelTra}>Delete Traveller</button>
            <button onClick={this.handleDispRes}>Display Reservation</button>
            <button onClick={this.handleDispSeat}>Display Seats</button>
          <hr />
          <AddTraveller createIssue={this.createIssue} msgDisplay = {this.msgDisplay} />
          <p id="msgDisplay"></p>
        </React.Fragment>
      );
    }
    else if (this.state.routes == 2)
    {
      return (
        <React.Fragment>
          <h1>Singapore Railway System</h1>
          <button onClick={this.handleAddTra}>Add Traveller</button>
          <button onClick={this.handleDelTra}>Delete Traveller</button>
          <button onClick={this.handleDispRes}>Display Reservation</button>
          <button onClick={this.handleDispSeat}>Display Seats</button>
          <hr />
          <DeleteTraveller deleteIssue={this.deleteIssue} />
        </React.Fragment>
      );
    }
    else if (this.state.routes == 3)
    {
      return (
        <React.Fragment>
          <h1>Singapore Railway System</h1>
          <button onClick={this.handleAddTra}>Add Traveller</button>
          <button onClick={this.handleDelTra}>Delete Traveller</button>
          <button onClick={this.handleDispRes}>Display Reservation</button>
          <button onClick={this.handleDispSeat}>Display Seats</button>
          <hr />
          <DisplayTraveller issues={this.state.issues} />
        </React.Fragment>
      );
    }
    else
    {
      return (
        <React.Fragment>
          <h1>Singapore Railway System</h1>
          <button onClick={this.handleAddTra}>Add Traveller</button>
          <button onClick={this.handleDelTra}>Delete Traveller</button>
          <button onClick={this.handleDispRes}>Display Reservation</button>
          <button onClick={this.handleDispSeat}>Display Seats</button>
          <hr />
          <DisplayTraveller issues={this.state.issues} />
        </React.Fragment>
      );
    }
  }
}

const element = <DisplayHomepage />;

ReactDOM.render(element, document.getElementById('contents'));
