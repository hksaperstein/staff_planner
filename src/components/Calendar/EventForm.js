import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, Form } from "react-bootstrap";

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventReasons: ["Vacation", "Family", "Other"],
      eventAllDay: false,
      calendarEvent: {
        id: 0,
        startDate: new Date(),
        endDate: new Date(),
        eventReason: "",
      },
    };
  }
  handleIDChange = (event) => {
    this.setState({
      calendarEvent: {
        ...this.state.calendarEvent,
        id: parseInt(event.target.value),
      },
    });
    // console.log(this.state.calendarEvent.startDate);
  };
  handleReasonSelection = (event) => {
    const value = event.target.value;
    this.setState({
      calendarEvent: {
        ...this.state.calendarEvent,
        eventReason: value,
      },
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      calendarEvent: {
        ...this.state.calendarEvent,
        [name]: date,
      },
    });
  };

  componentDidMount() {
    console.log(this.state.calendarEvent.eventReason);
  }

  render() {
    return (
      <div>
        <Form onSubmit={(event) => this.props.onSubmitButton(this.state.calendarEvent, event)}>
          <Form.Label>DynamoDB ID</Form.Label>
          <Form.Control
            onChange={this.handleIDChange}
            value={this.state.calendarEvent.id}
            name="id"
            required
            type="number"
            placeholder="Enter New ID"
          />
          <Form.Label>Start Date and Time</Form.Label>
          <DateTimePicker
            name="startDate"
            disableClock={true}
            value={this.state.calendarEvent.startDate}
            onChange={(date, name) => this.handleDateChange(date, "startDate")}
          />
          <Form.Label>End Date and Time</Form.Label>
          <DateTimePicker
            name="endDate"
            disableClock={true}
            value={this.state.calendarEvent.endDate}
            onChange={(date, name) => this.handleDateChange(date, "endDate")}
          />
          {this.state.eventReasons.map((reason) => (
            <Form.Check
              key={`custom-${reason}`}
              className="mb-2"
              type="radio"
              value={reason}
              label={reason}
              required
              checked={this.state.calendarEvent.eventReason === reason}
              onChange={this.handleReasonSelection}
            />
          ))}
          <Button type="submit">Submit New Event</Button>
        </Form>
      </div>
    );
  }
}

export default EventForm;
