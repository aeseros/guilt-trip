import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Grid } from 'semantic-ui-react';
// import { events } from '../../../server/models/Event';
import EventCard from '../components/EventCard';

function Home() {
  const { loading, data } = useQuery(QUERY_EVENTS);

  // data:{getAllEvents: events}

  const [events, setEvents] = useState([]);

  // :{getAllEvents: events}

  useEffect(() => {
    if(data && data.getAllEvents){
      console.log(data);
      let event = data.getAllEvents
      console.log(event);
      setEvents(event);
    }
  }, [data, setEvents]);

      // if(data){
      // console.log(data);
      // setEvents(data);
      // }

  //  if(events){
  //   console.log(events);
  //   // setEvents(data);
  // }

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>Recent Events</h1>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          events && events.map(event => (
            <Grid.Column key={event.id}>
              <EventCard event={event}/>
              {/* <h2>{event.id}</h2> */}
            </Grid.Column>
          ))
        )}
      </Grid.Row>

      {/* <Grid.Row>
        {events}
      </Grid.Row> */}

    </Grid>
  )
}

export const QUERY_EVENTS = gql `
  {
      getAllEvents {
        id
        title
        description
        date
        location
        createdAt
        username
      }

  }
`;

export default Home;