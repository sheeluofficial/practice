import React from 'react'

export default function (props) {
        const {company,email,first_name,gender,image,last_name,skill}=props.user
  return (
    <div style={{border:"2px solid red"}}>
        <img src={image} alt="" />
        <h2>{`${first_name} ${last_name}`}</h2>
        <h5>{email}</h5>
        <h4>{gender}</h4>
        <h3>{company}</h3>
        <h3>{skill}</h3>

    </div>
  )
}
