import styles from './Form.styles.module.css'

type FormProps = {
  children: any
  onSubmit: (event: any) => Promise<void>
  error?: string
  title?: string
}

const Form = ({ children, error, onSubmit, title }: FormProps) => {
  return (
    <div className={styles.formContainer}>
      <h1>{title}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
        <button type='submit' className={styles.button}>
          Apply
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  )
}

export default Form
