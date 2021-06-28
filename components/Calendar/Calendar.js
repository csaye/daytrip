import { v4 as uuid } from 'uuid';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import styles from './Calendar.module.css';

export default function Calendar(props) {
  // creates event on selection
  function createEvent(selectInfo) {
    // get calendar component
    const calendar = selectInfo.view.calendar;
    // clear selection
    calendar.unselect();
    // add event
    const title = prompt('Enter event term (e.g. ice cream, park, diner): ');
    if (title) {
      calendar.addEvent({
        id: uuid(),
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        title: title
      });
    }
  }

  // delete event on click
  function deleteEvent(clickInfo) {
    if (confirm('Delete event?')) clickInfo.event.remove();
  }

  // sets parent events
  function setEvents(events) {
    // get minimized events
    const eventsMin = events.map(e => {
      return {
        term: e.title,
        start: e.start.getTime(),
        end: e.end.getTime()
      }
    });
    // set minimized events
    props.setEvents(eventsMin);
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <FullCalendar
          initialView="timeGridDay"
          height="auto"
          plugins={[timeGridPlugin, interactionPlugin]}
          allDaySlot={false}
          selectable={true}
          editable={true}
          eventResizableFromStart={true}
          select={createEvent}
          eventClick={deleteEvent}
          eventsSet={setEvents}
        />
      </div>
    </div>
  );
}
