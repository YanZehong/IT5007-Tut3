# IT5007-Tut3 Singapore Railway System
github: https://github.com/YanZehong/IT5007-YZH.git

## Framework
### React Components
#### Main component: <DisplayHomepage />
Contain logic code for enabling buttons to display the relevant components. Define states and props for maintaining information that is persistent/shared between components.  

states: 
(1)"routes" for component switch;  
(2)"issues" for displaying the reservation list;  
(3)"seatDict" for visual representation of reserved/unreserved tickets.  

props:
(1) constructor(): init. and binding statement;  
(2) componentDidMount() and loadData(): load data;  
(3) createIssue(issue): take issue as input and update state;  
(4) deleteIssue(issueID): take ticket ID as input for deleting a traveller. This property can be easily modified for traveller's "name" matching;  
(5) msgDisplay(msg)/msgDisplayDel(msg): show messages for booking status (successful, occupied, invalid input, not found);  
(6) handleAddTra/handleDelTra/handleDispRes/handleDispSeat: event handling to enable displaying/hiding among components;

#### Child Components:
- addTraveller: class AddTraveller  
- deleteTraveller: class DeleteTraveller  
- displayTraveller: class DisplayTraveller and class IssueRow  
- displayFreeSeats(advanced): class DisplaySeat  

#### Corner cases:
(1) underflow and overflow (<0 or >25)- throw Error: Invalid Seat Number  
(2) contain letters in Seat No.- throw Error: Invalid Seat Number  
(3) occupied slots- throw message: Occupied Seat  
(4) delete free seat- throw message: Not found! No need to delete  
