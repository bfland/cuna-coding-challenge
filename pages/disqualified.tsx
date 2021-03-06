import faker from 'faker'

const Disqualified = ({ message }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sorry, you do not qualify for a loan at this time.</h1>
      <p>The reasons for this decision include: {message}</p>
      <p>
        If you have questions, customer service can be reached by calling: {faker.phone.phoneNumberFormat()}
      </p>
    </div>
  )
}

export default Disqualified
