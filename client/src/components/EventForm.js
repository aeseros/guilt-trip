import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
// import { useForm } from '../utils/hooks.js';
// import { useMutation } from '@apollo/react-hooks';

function EventForm(){

//   const { values, onChange, onSubmit } = useForm(EventCallBack, {
//     title: '',
//     description: '',
//     location: '',
//   })

//   const [createPost, { error }] = useMutation(CREATE_EVENT, {
//     variables: values,
//     update(proxy, result) {
//       console.log(result)
//       values.description = ''
//     }
//   });

//   function EventCallBack(){
//     createEvent();
//   }

  return (
    <Form>
      <h3>Create an event</h3>
      <Form.Field>
        <Form.Input
          placeholder="Enter a title"
          name="title"
          // onChange={onChange}
          // value={values.title}
          />

        <Form.Input
          placeholder="Describe your trip"
          name="description"
          // onChange={onChange}
          // value={values.description}
          />

        <Form.Input
          placeholder="Where did you go?"
          name="location"
          // onChange={onChange}
          // value={values.location}
          />
        <Button type="submit" color="primary">
          Create
        </Button>
      </Form.Field>
    </Form>
  )
}

// const CREATE_EVENT = gql `
// mutation createEvent (
//   $title: String!
//   $description: String!
//   location: String
// ){
//   createEvent(event: {
//     title: $title
//     description: $description
//     location: $location
//   }){
//     id
//     title
//     description
//   }
// }
// `;

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

export default EventForm;