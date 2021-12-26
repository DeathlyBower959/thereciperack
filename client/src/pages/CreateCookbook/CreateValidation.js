export default function validate(values, isSubmit) {
    let errors = {}

    if (values.name || isSubmit) {
        if (!values.name) errors.name = 'The name is required'
        else if (values.name?.toString().trim() == '')
            errors.name = 'The name is required'
    }

    if (values.description || isSubmit) {
        if (!values.description) errors.description = 'A description is required'
        else if (values.description.toString().trim() == '')
            errors.description = 'A description is required'
    }

    return errors
}
