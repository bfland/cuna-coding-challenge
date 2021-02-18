import styles from './FormField.styles.module.css'

type InputProps = {
  [key: string]: any
}

type FormFieldProps = {
  label: string
  onChange: (event: any) => void
  type: string
  value: string | number
  inputProps?: InputProps
  prefix?: string
}

const FormField = ({
  inputProps,
  label,
  onChange,
  prefix,
  type,
  value
}: FormFieldProps) => {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div className={styles.input}>
        {prefix}
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          {...inputProps}
        />
      </div>
    </div>
  )
}

FormField.defaultProps = {
  inputProps: {}
}

export default FormField