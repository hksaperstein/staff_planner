import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";

class CalendarEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      startDate: new Date(),
      endDate: new Date(),
      reason: "",
      username: "",
    };
  }
  componentDidMount = () => {
    this.setState({
      id: this.props.calendarEvent.id,
      startDate: this.props.calendarEvent.dates.startDate,
      endDate: this.props.calendarEvent.dates.endDate,
      reason: this.props.calendarEvent.reason,
      username: this.props.calendarEvent.username,
    });
  };
  render() {
    const { id, startDate, endDate, reason } = this.state;
    return (
      <Fragment>
        <tr key={id}>
          <td name="Event ID">{`${id}`}</td>
          <td name="Event Start Date">{`${startDate}`}</td>
          <td name="Event End Date">{`${endDate}`}</td>
          <td name="Event Reason">{`${reason}`}</td>
          <td name="Event Update Button">
            <Button variant="outline-primary">Update Event</Button>
          </td>
          <td name="Event Delete Button">
            <Button variant="outline-danger" onClick={(event) => this.props.onDeleteButton(id, event)}>
              Delete Event
            </Button>
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default CalendarEvent;
