import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Grid } from 'semantic-ui-react';
// import { events } from '../../../server/models/Event';
import EventCard from '../components/EventCard';

function Home() {
  const { loading, data } = useQuery(QUERY_EVENTS);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if(data && data.getAllEvents){
      console.log(data);
      let event = data.getAllEvents
      console.log(event);
      setEvents(event);
    }
  }, [data, setEvents]);

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
            </Grid.Column>
          ))
        )}
      </Grid.Row>

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