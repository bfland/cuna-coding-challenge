import { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Form, FormField } from '../Form'
import styles from './styles.module.css'

type State = {
  error: ''
  price: string
  make: string
  model: string
  income: string
  creditScore: string
}

type WithRouterProps = {
  router: NextRouter
}

type FormProps = WithRouterProps & { setMessage: (msg: string) => void }

class AutoLoanForm extends Component<FormProps> {
  state: State = {
    error: '',
    price: '',
    make: '',
    model: '',
    income: '',
    creditScore: ''
  }

  onFormSubmit = async event => {
    // Disable form submission/page refresh when pressing 'enter' key.
    event.preventDefault()

    const res = await fetch('/api/qualify', {
      method: 'post',
      body: JSON.stringify(this.state)
    })

    // In a real-world app, this would not suffice to handle all instances of an unsuccessful
    // request, as other status codes can return ok = false, and are not guaranteed to be due
    // to the user exceeding the price limit.
    if (!res.ok) {
      this.setState({
        error:
          'Price limit exceeded. Please enter a price of $1,000,000 or less and try again.'
      })
      return
    }

    const { qualified, message } = await res.json()

    if (qualified) {
      this.props.router.push('/new-account')
    } else {
      this.props.setMessage(message)
      this.props.router.push('/disqualified')
    }
  }

  /**
   * NOTES:
   * - For brevity and simplicity, I'm only focusing on whole numbers for the currency inputs, not decimals.
   * - I would look to create a reusable component for the input fields if the complexity increased, and
   *   the amount of repeated jsx grew.
   */
  render () {
    return (
      <Form
        error={this.state.error}
        onSubmit={this.onFormSubmit}
        title='Auto Loan Application'
      >
        <FormField
          label='Auto Purchase Price'
          type='number'
          value={this.state.price}
          prefix='$'
          onChange={e => this.setState({ price: e.target.value })}
          inputProps={{
            min: 1
          }}
        />

        <FormField
          label='Auto Make'
          type='text'
          value={this.state.make}
          onChange={e => this.setState({ make: e.target.value })}
        />

        <FormField
          label='Auto Model'
          type='text'
          value={this.state.model}
          onChange={e => this.setState({ model: e.target.value })}
        />

        <FormField
          label='Estimated Yearly Income'
          type='number'
          value={this.state.income}
          prefix='$'
          onChange={e => this.setState({ income: e.target.value })}
          inputProps={{
            min: 0
          }}
        />

        <FormField
          label='Estimated Credit Score'
          type='number'
          value={this.state.creditScore}
          onChange={e => this.setState({ creditScore: e.target.value })}
          inputProps={{
            min: 300,
            max: 850
          }}
        />
      </Form>
    )
  }
}

export default withRouter(AutoLoanForm)
