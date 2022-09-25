import React from "react";

const getBageClasses = (colorName) => {
  let classes = "badge m-1 bg-";
  classes += colorName;
  return classes;
};

const Quality = ({color, name}) => {
  return (
    <span className={getBageClasses(color)}>{name} </span>
  );
};

export default Quality;