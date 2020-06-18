import React, { Component, Fragment } from 'react'
import CalendarEvent from './CalendarEvent';

class EventTable extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const create = React.createElement
        
        const {calendarEvents, onDeleteButton} = this.props

        return (
            create('div', null, 
                create('table', {},
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
                        calendarEvents.map(
                            calendarEvent => 
                            create(CalendarEvent, 
                                {
                                    key: calendarEvent.id, 
                                    calendarEvent: calendarEvent,
                                    onDeleteButton:onDeleteButton
                                }, null)
                        )
                    )
                )
            )
        )
    }
}

export default EventTable
