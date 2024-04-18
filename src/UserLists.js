import React from "react";
import ListComponent from "./ListComponent";

export default function UserLists() {
	return (
		<div>
			<ListComponent listName={"My first list"}/>
			<ListComponent listName={"My second list"}/>
		</div>
	)
}