import styles from './Form.styles.module.css'

type FormProps = {
    children: any
    onSubmit: () => void
    error?: string
}

const Form = ({ children, error, onSubmit }: FormProps) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {children}
            <button type='submit' className={styles.button} />
            <div className={styles.error}>{error}</div>
        </form>
    )
}

export default Form