import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import CalendarEvent from './CalendarEvent';
import Calendar from 'react-calendar';
// import DatetimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import 'react-calendar/dist/Calendar.css';
import EventForm from './EventForm';
const config = require("../../config.json")

class PersonalCalendar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
            calendarEvents:[],
            userEmail: '',
            eventDates:{
                startDate: new Date(),
                endDate: new Date()
            },
            newEvent:{
                id: 0,
                startDate: 0,
                startMonth: 0,
                startYear: 0,
                startTime: 0,
                endTime: 0,
                reason: "TESTING REASON, NEED RADIO",
                username: '',
            }
        }
    }


    formatEventForSubmission(calendarEvent){
        return({
            "id": calendarEvent.id,
            "dates": {
                "startDate": calendarEvent.startDate.toLocaleString('en-US'),
                "endDate": calendarEvent.endDate.toLocaleString('en-US')
            },
            "reason": this.state.newEvent.reason,
            "username": this.state.userEmail

        })
        
    }

    handleEventFormChange = (event) => {
        this.setState({
            newEvent:{
                ...this.state.newEvent,
                [event.target.name]: event.target.value ? parseInt(event.target.value) : ''
            }
        })

        console.log(this.state.newEvent)
        
    }

    handleDateSelectionChange = (dates) => {
        const startDate = dates[0]
        const endDate = dates[1]
        console.log(startDate)
        console.log(endDate)

        // this.setState({
        //     eventDates:{
        //         ...this.state.eventDates,
        //         startDate: date
        //     }
        // })
    }

    handleStartDateSelectionChange = (date) => {
        console.log(date)
        this.setState({
            eventDates:{
                ...this.state.eventDates,
                startDate: date
            }
        })
    }
    handleEndDateSelectionChange = (date) => {
        // console.log(date)
        // this.setState({
        //     eventDates:{
        //         ...this.state.eventDates,
        //         endDate: date
        //     }
        // })
    }

    // TODO TEST and properly input formatted event
    handleUpdateEventSubmit = async(id, event) =>{
        let params = null
        try{
            // params = fetchEventUpdate(id)
            await Axios.patch(
                `${config.api.invokeUrl}/calendarevents/${id}`,
                params
                )
        } catch(error){
            console.log(`Unable to update new calendar event: ${error}`)

        }
    }

    handleNewEventSubmit = async (calendarEvent, event) =>{
        event.preventDefault()
        console.log(calendarEvent)
        try{
            const params = this.formatEventForSubmission(calendarEvent)
            console.log(calendarEvent.id)
            const response = await Axios.post(
                `${config.api.invokeUrl}/calendarevents/${calendarEvent.id}`,
                params
            )
            console.log(response)

            // this.setState({
            //     calendarEvents: [...this.state.calendarEvents, this.state.newEvent]
            // })
            // this.setState({
            //     newEvent:{
            //         id: 0,
            //         day: 0,
            //         month: 0,
            //         year: 0,
            //         startTime: 0,
            //         endTime: 0,
            //         reason: "TESTING REASON, NEED RADIO",
            //         username: this.state.userEmail
            //     }
            // })

        } catch (error) {
            console.log(`Unable to create new calendar event: ${error}`)
        }
    }

    handleDeleteEventSubmit = async (id, event) =>{
        event.preventDefault()
        try{
            await Axios.delete(`${config.api.invokeUrl}/calendarevents/${id}`)
            const updatedCalendarEvents = [...this.state.calendarEvents].filter(calendarEvent => calendarEvent.id !== id)
            this.setState({
                calendarEvents: updatedCalendarEvents
            })
        } catch(error){
            console.log(`Unable to update new calendar event: ${error.message}`)

        }
    }

    fetchAllCalendarEvents = async () => {
        let response = null
        try{
            response = await Axios.get( `${config.api.invokeUrl}/calendarevents`);
            this.setState({
                calendarEvents: response.data.Items
            })
        } catch(error) {
            console.log(`Unable to retrieve calendar events: ${error}`)
        }
    }

    componentDidMount = () => {
        this.setState({
            userEmail: this.props.authProps.user.attributes.email
        })
        this.fetchAllCalendarEvents()
    }

    render() {
        const create = React.createElement
        return (
            create(Fragment, null, 
                create(Calendar, 
                    {
                        onClickDay: this.handleDateClick,
                        value: this.state.selectedDate
                    }, null),
                create(EventForm, {onSubmitButton:this.handleNewEventSubmit}, null),
                // create('button', {type: "button", onClick:event => this.handleDeleteEventSubmit(34, event)}, "delete"),
                this.state.calendarEvents && this.state.calendarEvents.length > 0 
                ? create('table', {},
                    create('thead', null, 
                        create('tr', null, 
                            create('th', null, "ID"),
                            create('th', null, "Start Date"),
                            create('th', null, "End Date"),
                            create('th', null, "Reason"),
                            create('th', null, "Update Event"),
                            create('th', null, "Delete Event"),
                        )
                    ),
                    create('tbody', null, 
                        this.state.calendarEvents.map(
                            calendarEvent => 
                            create(CalendarEvent, 
                                {
                                    key: calendarEvent.id, 
                                    calendarEvent: calendarEvent,
                                    onDeleteButton:this.handleDeleteEventSubmit
                                }, null)
                        )
                    )
                )
                : create('h1', null, "No events"),
            )
        )   
    }
}

export default PersonalCalendar
