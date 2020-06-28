import React, { Component, Fragment } from "react";
import Axios from "axios";
import Calendar from "react-calendar";
// import DatetimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import "react-calendar/dist/Calendar.css";
import EventForm from "./EventForm";
import EventTable from "./EventTable";
import { Container, Row, Col } from "react-bootstrap";

const config = require("../../config.json");

class PersonalCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarEvents: [],
      userEmail: "",
      eventDates: {
        startDate: new Date(),
        endDate: new Date(),
      },
      newEvent: {
        id: 0,
        startDate: 0,
        startMonth: 0,
        startYear: 0,
        startTime: 0,
        endTime: 0,
        reason: "TESTING REASON, NEED RADIO",
        username: "",
      },
    };
  }

  formatEventForSubmission(calendarEvent) {
    return {
      id: calendarEvent.id,
      dates: {
        startDate: calendarEvent.startDate.toLocaleString("en-US"),
        endDate: calendarEvent.endDate.toLocaleString("en-US"),
      },
      reason: calendarEvent.eventReason,
      username: this.state.userEmail,
    };
  }

  // TODO TEST and properly input formatted event
  handleUpdateEventSubmit = async (id, event) => {
    let params = null;
    try {
      // params = fetchEventUpdate(id)
      await Axios.patch(`${config.api.invokeUrl}/calendarevents/${id}`, params);
    } catch (error) {
      console.log(`Unable to update new calendar event: ${error}`);
    }
  };
  //TODO UUID
  handleNewEventSubmit = async (calendarEvent, event) => {
    event.preventDefault();
    console.log(this.state.calendarEvents);
    console.log(calendarEvent);
    try {
      const params = this.formatEventForSubmission(calendarEvent);
      console.log(params);
      const response = await Axios.post(`${config.api.invokeUrl}/calendarevents/${calendarEvent.id}`, params);
      this.setState({
        calendarEvents: [...this.state.calendarEvents, params],
      });
    } catch (error) {
      console.log(`Unable to create new calendar event: ${error}`);
    }
  };

  handleDeleteEventSubmit = async (id, event) => {
    event.preventDefault();
    try {
      await Axios.delete(`${config.api.invokeUrl}/calendarevents/${id}`);
      const updatedCalendarEvents = [...this.state.calendarEvents].filter((calendarEvent) => calendarEvent.id !== id);
      this.setState({
        calendarEvents: updatedCalendarEvents,
      });
    } catch (error) {
      console.log(`Unable to update new calendar event: ${error.message}`);
    }
  };

  fetchAllCalendarEvents = async () => {
    let response = null;
    try {
      response = await Axios.get(`${config.api.invokeUrl}/calendarevents`);
      this.setState({
        calendarEvents: response.data.Items,
      });
    } catch (error) {
      console.log(`Unable to retrieve calendar events: ${error}`);
    }
  };

  componentDidMount = () => {
    this.setState({
      userEmail: this.props.authProps.user.attributes.email,
    });
    this.fetchAllCalendarEvents();
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <Calendar onClickDay={this.handleDateClick} value={this.state.selectedDate} />
            </Col>
            <Col>
              <EventForm onSubmitButton={this.handleNewEventSubmit} />
            </Col>
          </Row>
        </Container>
        {this.state.calendarEvents && this.state.calendarEvents.length > 0 ? (
          <EventTable calendarEvents={this.state.calendarEvents} onDeleteButton={this.handleDeleteEventSubmit} />
        ) : (
          <h1>No Events</h1>
        )}
      </Fragment>
    );
  }
}

export default PersonalCalendar;
