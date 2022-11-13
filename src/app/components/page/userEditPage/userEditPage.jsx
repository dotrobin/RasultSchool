import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = ({ userId }) => {
	const history = useHistory();
	const [user, setUser] = useState();
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
		api.users.getById(userId).then((data) => setUser(data));
		api.professions.fetchAll().then((data) => setProfessions(data));
		api.qualities.fetchAll().then((data) => setQualities(data));
	}, []);

	const isValid = Object.keys(errors).length === 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) return;
		console.log(user);
		history.push("/users");
	};

	const validate = () => {
		const errors = validator(user, validatorConfig);
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleChange = (target) => {
		setUser((prevState) => ({
			...prevState,
			[target.name]: target.value
		}));
	};

	if (user) {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-6 offset-md-3 shadow p-4">
						<form onSubmit={handleSubmit}>
							<TextField
								label="Имя"
								name="name"
								value={user.name}
								onChange={handleChange}
								error={errors.name}
							/>
							<SelectField
								Label="Выберите {профессию"
								defaultOption={user.profession.name}
								options={professions}
								onChange={handleChange}
								value={user.profession.name}
								error={errors.profession}
								name="profession"
							/>
							<RadioField
								options={[{ name: "Male", value: "male" },
									{ name: "FeMale", value: "female" },
									{ name: "Other", value: "other" }
								]}
								name="sex"
								onChange={handleChange}
								value={user.sex}
								label="Выберите свой пол"
							/>
							<MultiSelectField
								options={qualities}
								onChange={handleChange}
								defaultValue={user.qualities}
								name="qualities"
								label="Выберите ваши качества"
							/>
							<button
								type="submit"
								disabled={!isValid}
								className="btn btn-primary w-100 mx-auto"
							>
								Изменить данные пользователя
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<>
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<div>
					Loading...
				</div>
			</>
		);
	};
};

UserEditPage.propTypes = {
	userId: PropTypes.string.isRequired
};

export default UserEditPage;
