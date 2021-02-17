import { Component } from 'react'
import styles from './styles.module.css'

type State = {
    error: ''
  price: string
  make: string
  model: string
  income: string
  creditScore: string
}

class AutoLoanForm extends Component {
  state: State = {
    error: '',
    price: '',
    make: '',
    model: '',
    income: '',
    creditScore: ''
  }

  onFormSubmit = async e => {
    // Disable form submission/page refresh when pressing 'enter' key.
    e.preventDefault()

    const res = await fetch('/api/qualify', {
        method: 'post',
        body: JSON.stringify(this.state)
    })
    
    if (!res.ok) {
        this.setState({ error: 'Price limit exceeded. Please enter a price of $1,000,000 or less and try again.' })
        return
    }

    const { qualified } = await res.json()

    if (qualified) {
        // reroute to success page
    } else {
        // reroute to denial page
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
      <div className={styles.autoLoanForm}>
        <h1>Auto Loan Application</h1>
        <form className={styles.form} onSubmit={this.onFormSubmit}>

          <div className={styles.field}>
            <label>Auto Purchase Price</label>
            <div>
              ${' '}
              <input
                type='number'
                min={1}
                value={this.state.price}
                onChange={e => this.setState({ price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Auto Make</label>
            <input
              type='text'
              value={this.state.make}
              onChange={e => this.setState({ make: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Auto Model</label>
            <input
              type='text'
              value={this.state.model}
              onChange={e => this.setState({ model: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Estimated Yearly Income</label>
            <div>
              ${' '}
              <input
                type='number'
                min={0}
                value={this.state.income}
                onChange={e => this.setState({ income: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Estimated Credit Score</label>
            <input
              type='number'
              min={300}
              max={850}
              value={this.state.creditScore}
              onChange={e => this.setState({ creditScore: e.target.value })}
              required
            />
          </div>

          <button type='submit' className={styles.button}>
            Apply
          </button>
        </form>
        
        <div className={styles.error}>{this.state.error}</div>
      </div>
    )
  }
}

export default AutoLoanForm
