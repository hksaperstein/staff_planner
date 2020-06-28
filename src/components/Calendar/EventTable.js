import React, { Component, Fragment } from "react";
import { Table, Button } from "react-bootstrap";

class EventTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { calendarEvents, onDeleteButton } = this.props;

    return (
      <div>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Update Event</th>
              <th>Delete Event</th>
            </tr>
          </thead>
          <tbody>
            {calendarEvents.map((calendarEvent) => (
              <tr key={calendarEvent.id}>
                <td name="Event ID">{`${calendarEvent.id}`}</td>
                <td name="Event Start Date">{`${calendarEvent.startDate}`}</td>
                <td name="Event End Date">{`${calendarEvent.endDate}`}</td>
                <td name="Event Reason">{`${calendarEvent.reason}`}</td>
                <td name="Event Update Button">
                  <Button variant="outline-primary">Update Event</Button>
                </td>
                <td name="Event Delete Button">
                  <Button variant="outline-danger" onClick={(event) => onDeleteButton(calendarEvent.id, event)}>
                    Delete Event
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EventTable;
