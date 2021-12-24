export default function validate(values, isSubmit) {
    let errors = {}

    if (values.name || isSubmit) {
        if (!values.name) errors.name = 'Your name is required'
        else if (values.name?.toString().trim() == '')
            errors.name = 'Your name is required'
        else if (values.name?.length < 5)
        errors.name = 'Too short, must be at least 5 characters long'
    }

    if (values.email || isSubmit) {
        if (!values.email) errors.email = 'Your email is required'
        else if (values.email?.toString().trim() == '')
            errors.email = 'Your email is required'
        else if (!/\S+@\S+\.\S+/.test(values.email))
            errors.email = 'Email address is invalid'
    }

    if (values.password || isSubmit) {
        if (!values.password) errors.password = 'Your password is required'
        else if (values.password.toString().trim() == '')
            errors.password = 'Your password is required'
        else if (values.password?.length < 8)
            errors.password = 'Password must be 8 or more characters'
    }

    if (values.cPassword || isSubmit) {
        if (
            !values.cPassword ||
            values.cPassword?.toString().trim() == '' ||
            values.cPassword != values.password
        )
            errors.cPassword = 'Password does not match'
    }

    return errors
}
