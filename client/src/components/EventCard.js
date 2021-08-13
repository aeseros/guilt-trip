import React from 'react';
import { Card } from 'semantic-ui-react';

function EventCard({ event: { title, description, id, createdAt } }){
  return (
    <Card>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{createdAt}</Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default EventCard