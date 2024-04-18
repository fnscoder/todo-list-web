import React from "react";
import ListComponent from "./ListComponent";

export default class UserLists extends React.Component {
	state = { lists: [], loading: true }

	async componentDidMount(){
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		config.headers["Authorization"] = "Token 4115d4893467ac48cba3c0cc3a88cf743801ea3d"

		var url = "http://127.0.0.1:8000/lists/";
		const response = await fetch(url, config);
		const data = await response.json();
		this.setState({lists: data, loading: false});
	}

	render() {
		const listAPI = this.state.lists;
		return (
			<div>				
				{listAPI.map(list => <ListComponent key={list.id} listName={list.name} items={list.items}/>)}
			</div>
		)
	}
}