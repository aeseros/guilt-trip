import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function Register(props) {
  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
  }

  const [addUser, { loading }] = useMutation(CREATE_USER, {
    update(proxy, result){
      console.log(result)
      props.history.push('/')
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  }

  let history = useHistory();
  const redirect = () => {
    history.push('/trips')
  }

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <Form.Input 
          label='Username' 
          placeholder='Enter a username' 
          name='username'
          type='text'
          value={values.username}
          onChange={onChange}
        />

        <Form.Input 
          label='Email' 
          placeholder='Enter a valid email' 
          name='email'
          type='email'
          value={values.email}
          onChange={onChange}
        />

        <Form.Input 
          label='Password' 
          placeholder='Create a password' 
          name='password'
          type='password'
          value={values.password}
          onChange={onChange}
        />
        <Button onClick={redirect} type="submit" primary>Register</Button>
      </Form>
    </div>
  )
}

const CREATE_USER = gql `
  mutation createUser (
    $username: String!
    $email: String!
    $password: String!
  ){
    createUser(user: {
        username: $username      
        email: $email
        password: $password
      }
    ){
      id
      email
      username
      token
    }
  }
`;

export default Register;