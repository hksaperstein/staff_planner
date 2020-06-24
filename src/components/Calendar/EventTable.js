import React, { Component, Fragment } from "react";
import CalendarEvent from "./CalendarEvent";
import { Table } from "react-bootstrap";

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
              <CalendarEvent key={calendarEvent.id} calendarEvent={calendarEvent} onDeleteButton={onDeleteButton} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EventTable;
