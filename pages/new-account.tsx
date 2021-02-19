import { useState } from 'react'
import { Form, FormField } from '../components/Form'

const newAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')
  const [error, setError] = useState('')

  // Regex to match existence of one special char or number (first condition
  // on loan from Stack Overflow).
  const specialCharsRegex = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]|\d/

  const validatePassword = (): boolean => {
    if (!specialCharsRegex.test(password)) {
      setError(
        'Password must contain at least one number or special character.'
      )
      return false
    }

    if (password !== retypedPassword) {
      setError('Passwords do not match.')
      return false
    }

    // If no validation error, clear error message.
    setError('')

    return true
  }

  const onFormSubmit = async event => {
    // Disable form submission/page refresh when pressing 'enter' key.
    event.preventDefault()

    // On failed validation, direct user to fix form issues before submission.
    if (!validatePassword()) return

    // Some continuation logic would exist here, on successful validation.
  }

  return (
    <Form error={error} onSubmit={onFormSubmit} title='Create New Account'>
      <FormField
        label='Email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <FormField
        label='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        inputProps={{
          minLength: 8
        }}
      />

      <FormField
        label='Re-enter Password'
        type='password'
        value={retypedPassword}
        onChange={e => setRetypedPassword(e.target.value)}
        inputProps={{
          minLength: 8
        }}
      />
    </Form>
  )
}

export default newAccount
