import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = () => {
	const { userId } = useParams();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState();
	const [errors, setErrors] = useState({});
	const [professions, setProfessions] = useState({});
	const [qualities, setQualities] = useState([]);
	const [data, setData] = useState({
		name: "",
		email: "",
		profession: "",
		sex: "male",
		qualities: []
	});

	const getProfessionById = (id) => {
		for (const prof of professions) {
			if (prof.value === id) {
				return { _id: prof.value, name: prof.label };
			}
		}
	};

	const getQualities = (elements) => {
		const qualitiesArray = [];
		for (const elem of elements) {
			for (const quality in qualities) {
				if (elem.value === qualities[quality].value) {
					qualitiesArray.push({
						_id: qualities[quality].value,
						name: qualities[quality].label,
						color: qualities[quality].color
					});
				}
			}
		}
		return qualitiesArray;
	};

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

	const transformData = (data) => {
		return data.map((qual) => ({ label: qual.name, value: qual._id }));
	};

	useEffect(() => {
		setIsLoading(true);
		api.users.getById(userId).then(({ profession, qualities, ...data }) =>
			setData((prevState) => ({
				...prevState,
				...data,
				qualities: transformData(qualities),
				profession: profession._id
			}))
		);
		api.professions.fetchAll().then((data) => setProfessions(data));
		api.qualities.fetchAll().then((data) => setQualities(data));
	}, []);

	useEffect(() => {
		if (data._id) setIsLoading(false);
	}, [data]);

	const isValid = Object.keys(errors).length === 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) return;
		const { profession, qualities } = data;
		api.users.update(userId, {
			...data,
			profession: getProfessionById(profession),
			qualities: getQualities(qualities)
		})
			.then((data) => history.push(`/users/${data._id}`));
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

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow p-4">
					{!isLoading && Object.keys(professions).length > 0
						? (
							<form onSubmit={handleSubmit}>
								<TextField
									label="Имя"
									name="name"
									value={data.name}
									onChange={handleChange}
									error={errors.name}
								/>
								<TextField
									label="Email"
									name="email"
									value={data.email}
									onChange={handleChange}
									error={errors.email}
								/>
								<SelectField
									label="Выберите свою профессию"
									defaultOption="Choose..."
									options={professions}
									onChange={handleChange}
									value={data.profession}
									error={errors.profession}
									name="profession"
								/>
								<RadioField
									options={[{ name: "Male", value: "male" },
										{ name: "Female", value: "female" },
										{ name: "Other", value: "other" }
									]}
									name="sex"
									onChange={handleChange}
									value={data.sex}
									label="Выберите свой пол"
								/>
								<MultiSelectField
									options={qualities}
									onChange={handleChange}
									defaultValue={data.qualities}
									name="qualities"
									label="Выберите ваши качества"
								/>
								<button
									type="submit"
									disabled={!isValid}
									className="btn btn-primary w-100 mx-auto"
								>
									Обновить
								</button>
							</form>)
						: <h1>Loading</h1>}
				</div>
			</div>
		</div>
	);
};

UserEditPage.propTypes = {
	userId: PropTypes.string.isRequired
};

export default UserEditPage;
