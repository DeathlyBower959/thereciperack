import { useState, useEffect } from 'react'

const useForm = (callback, validate, defaultValues = {}) => {
    const [values, setValues] = useState(defaultValues)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback()
        }
    }, [errors])

    const handleSubmit = (event) => {
        event?.preventDefault()

        setErrors(() => {
            const validation = validate(values, true)

            setIsSubmitting(Object.keys(validation).length === 0)

            return validation
        })
    }

    const handleChange = (event) => {
        event.persist()
        setErrors((prev) => {
            return { ...prev, [event.target.name]: null }
        })
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }))
    }

    const addError = (name, message) => {
        setErrors((prev) => {
            return { ...prev, [name]: message }
        })
    }

    return {
        addError,
        handleChange,
        handleSubmit,
        values,
        errors,
    }
}

export default useForm
