import { useState, useEffect } from "react";
import { addData } from "../../Redux/Data/action.js";
import {useSelector, useDispatch} from "react-redux";


 export const Table = ({toggleShow, show, setshow}) => {
  const {data} = useSelector((store) => (store.data))
  const dispatch = useDispatch();

  const getData = () => {
    fetch("https://country-city-backend.herokuapp.com/cities")
      .then((res) => res.json())
      .then((value) => dispatch(addData(value)));
  };

  const handleDelete = (id) => {
    fetch(`https://country-city-backend.herokuapp.com/cities/${id}`, {
      method: "DELETE"
    })
    .then(alert("Proceed To Delete ?"))
    .then(getData())
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data)
  return (
    <table style={{border:"2px solid yellow"}}>
      <thead >
        <tr>
          <th style={{backgroundColor:"red"}}>id</th>
          <th style={{backgroundColor:"red"}}>Country</th>
          <th style={{backgroundColor:"red"}}>City</th>
          <th style={{backgroundColor:"red"}}>Population</th>
          <th style={{backgroundColor:"red"}}>Edit</th>
          <th style={{backgroundColor:"red"}}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            <td>{e.country}</td>
            <td>{e.city}</td>
            <td>{e.population}</td>
            <td>
              <button onClick = {() => {toggleShow(e)}} style = {{backgroundColor: "gray", color: "white", fontSize: "10px", borderRadius:"2px"}}>Edit</button>
            </td>
            <td>
              <button onClick = {() => {handleDelete(e.id)}} style = {{backgroundColor: "gray", color: "white", fontSize: "10px", borderRadius:"2px"}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
