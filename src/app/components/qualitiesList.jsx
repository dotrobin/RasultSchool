import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";

const QualitiesList = ({ qualities }) => {
	return (
		<>
			{qualities.map((qual, key) => {
				return (
					<Quality
						{...qual}
						key={"ql" + key}
					/>
				);
			})}
		</>
	);
};

QualitiesList.propTypes = {
	qualities: PropTypes.array
};

export default QualitiesList;
