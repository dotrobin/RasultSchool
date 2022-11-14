import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		profession: "",
		sex: "male",
		qualities: [],
		license: false
	});
	const [errors, setErrors] = useState({});
	const [professions, setProfessions] = useState();
	const [qualities, setQualities] = useState([]);

	const validatorConfig = {
		email: {
			isRequired: {
				message: "Электронная почта обязательна для заполнения"
			},
			isEmail: {
				message: "Email введен некорректно"
			}
		},
		password: {
			isRequired: {
				message: "Пароль не должен быть пустым"
			},
			isCapitalSymbol: {
				message: "Пароль должен содержать хотя бы одну заглавную букву"
			},
			isContainDigit: {
				message: "Пароль должен содержать хотя бы одно число"
			},
			min: {
				message: "Пароль должен состоять минимум из 8 символов",
				value: 8
			}
		},
		profession: {
			isRequired: {
				message: "Обязательно выберите Вашу профессию"
			}
		},
		license: {
			isRequired: {
				message: "Вы не приняли лицензионное соглашение"
			}
		}
	};

	useEffect(() => {
		validate();
	}, [data]);

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data));
		api.qualities.fetchAll().then((data) => setQualities(data));
	}, []);

	const validate = () => {
		const errors = validator(data, validatorConfig);
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const isValid = Object.keys(errors).length === 0;

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) return;
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Электронная почта"
				name="email"
				value={data.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				label="Пароль"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				error={errors.password}
			/>
			<SelectField
				Label="Выберите вашу профессию"
				defaultValue="Choose..."
				options={professions}
				onChange={handleChange}
				value={data.profession}
				error={errors.profession}
				name="profession"
			/>
			<RadioField
				options={[
					{ name: "Male", value: "male" },
					{ name: "FeMale", value: "female" },
					{ name: "Other", value: "other" }
				]}
				name="sex"
				onChange={handleChange}
				value={data.sex}
				label="Выберите ваш пол"
			/>
			<MultiSelectField
				options={qualities}
				onChange={handleChange}
				defaultValue={data.qualities}
				name="qualities"
				label="Выберите ваши качества"
			/>
			<CheckBoxField
				value={data.license}
				onChange={handleChange}
				name="license"
				error={errors.license}
			>
				Оставаться в системе
			</CheckBoxField>
			<button
				type="submit"
				disabled={!isValid}
				className="btn btn-primary w-100 mx-auto"
			>
				Submit
			</button>
		</form>
	);
};

export default RegisterForm;
