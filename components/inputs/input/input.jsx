/**
 * A Input jsx
 * @param {string} label Label the checkbox.
 * @param {string} type Type of the input like text, email, url, number.
 * @param {string} name Name of the input element.
 * @param {string} value Value helod by input at initial phase.
 * @returns {function} Retun a JSX function.
 */

const Input = ({ name = '', type = 'text', className, placeholder = '', ...props }) => {
    return (
        <input className={`form-check-input custom-input ${className}`} name={name} type={type} {...props} id={props?.id} placeholder={placeholder} />
    )
}

export default Input;
