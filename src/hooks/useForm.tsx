import React, { ChangeEvent, FormEvent, useState } from "react";

/**
 * It takes values prop types and make 'em optional with string[]
 ** ex. `[{email: ['er1', 'er2']}]`
*/
type Errors<T> = { [P in keyof T]?: string[] }

interface useFormResult<T> {
	values: T,
	handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
	handleSubmit: (e: FormEvent) => void,
	errors: Errors<T>,
	setErrors: React.Dispatch<React.SetStateAction<Errors<T>>>,
	restForm: () => void,
}

export default function useForm<T>(formValues: T, onSubmit: (values: T) => void): useFormResult<T> {

	const [values, setValues] = useState(formValues)
	const [errors, setErrors] = useState<Errors<T>>({})

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value, type } = e.target

		if(type == 'file') {
			const { files }  = e.target as HTMLInputElement
			if(files?.length) {
				console.log(files[0])
			}
		}
		

		setErrors(prevErrors => ({
			...prevErrors,
			[name]: '',
		}))

		setValues(prevValues => ({
			...prevValues,
			[name]: value,
		}))
	}

	function handleSubmit (e: FormEvent) {
		e.preventDefault()

		onSubmit(values)
	}

	function restForm() {
		setValues(formValues)
		setErrors({})
	}

	return {
		values,
		handleChange,
		handleSubmit,
		errors,
		setErrors,
		restForm,
	}
}