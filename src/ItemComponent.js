import React from "react";


export default function ItemComponent(props){
  const status = props.status;
  return (
    <li>
      <div><strong>{ props.name } </strong></div>
      <div>Status: {status ? <span>Done</span> : <span>To do</span>}</div>
    </li>
  )
}