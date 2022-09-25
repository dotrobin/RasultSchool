import React from "react";

const User = (props) => {
  const {_id, name, qualities, profession, completedMeetings, rate} = props;

  const getBageClasses = (name) => {
		let classes = "badge m-1 bg-";
		classes += name;
		return classes
	};

  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{
        qualities.map((quality, key) => {
          return (<span className={getBageClasses(quality.color)} key={key}>{quality.name}</span>)	
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td><button type="button" className="btn btn-danger" onClick={() => props.handleDeleteUser(_id)}>delete</button></td>
    </tr>
  );
}

export default User;