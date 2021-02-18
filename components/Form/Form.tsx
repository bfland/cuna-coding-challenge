import styles from './Form.styles.module.css'

type FormProps = {
    children: any
    onSubmit: (event: any) => Promise<void>
    error?: string
}

const Form = ({ children, error, onSubmit }: FormProps) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {children}
            <button type='submit' className={styles.button}>Apply</button>
            {error && <div className={styles.error}>{error}</div>}
        </form>
    )
}

export default Form