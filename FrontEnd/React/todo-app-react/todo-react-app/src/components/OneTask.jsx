import React from 'react'

function OneTask({data}) {
  return (
    <tr id={data.id}>
  <td>{data.id}</td>
  <td>{data.title}</td>
  <td>{data.status?"True":"False"}</td>
    </tr>
  )
}

export default OneTask