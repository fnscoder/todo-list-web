import React from "react";
import ItemComponent from "./ItemComponent";


export default function ListComponent(props){
  return (
    <div>
      <h2>{ props.listName }</h2>
      <ul>
        <ItemComponent name="item 1"/>
        <ItemComponent name="item 2"/>
        <ItemComponent name="item 3"/>
      </ul>
    </div>
  );
}