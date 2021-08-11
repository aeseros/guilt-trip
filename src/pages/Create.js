import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// Material UI Components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core';

import { makeStyles } from '@material-ui/core' // Function Importing CSS from Core Library

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 15,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('family') // Default Sets Radio

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }

  return (
    <div>
      <Container>
        <Typography
          variant='h5'
          color='textSecondary'
          component='h2'
          gutterBottom
        >
          New Trip Card
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        {/*Form Title*/}
        <TextField
        onChange={(e) => setTitle(e.target.value)}
        className={classes.field}
          label='Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        {/*Form Details*/}
        <TextField
        onChange={(e) => setDetails(e.target.value)}
        className={classes.field}
          label='Write in your journal'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        {/*Form Categories*/}
        <FormControl className={classes.field}>
        <FormLabel>
          Trip Category
        </FormLabel>
        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
          <FormControlLabel value="family" control={<Radio />} label="Family Trip" />
          <FormControlLabel value="business" control={<Radio />} label="Business Trip" />
          <FormControlLabel value="vacation"control={<Radio />} label="Vacation Trip" />
        </RadioGroup>
        </FormControl>
        {/*Form Button*/}
        <Button
          type='submit'
          color='secondary'
          variant='outlined'
          startIcon={<LocationSearchingIcon />}
        >
          Submit
        </Button>
        </form>
      </Container>
    </div>
  )
}