import React, { useState, useEffect } from "react";
import ListComponent from "./ListComponent";

export default function UserLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLists() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + localStorage.getItem("token")
        }
      };

      try {
        const url = process.env.REACT_APP_API_URL + "lists/";
        const response = await fetch(url, config);
        const data = await response.json();
        setLists(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setLoading(false);
      }
    }

    fetchLists();
  }, []);  // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {lists.map(list => (
        <ListComponent key={list.id} listName={list.name} items={list.items}/>
      ))}
    </div>
  );
}