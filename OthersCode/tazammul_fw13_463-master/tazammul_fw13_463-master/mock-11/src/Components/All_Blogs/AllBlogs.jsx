import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import "./AllBlogs.style.css";

var url = "https://mock-eleven.herokuapp.com";
function AllBlogs() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [authorsOption, setAuthorOptions] = useState([]);
  const [categoriesOption, setCategoriesOptions] = useState([]);

  const [author, setAuthor] = useState("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setLoader(true);
    fetch(url + `/blog?category=${category}&author=${author}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setLoader(false);
        if (!resp.error) {
          if (data.length == 0) {
            let obj = {};
            resp.data.map((el) => {
              obj[el.author] = 1;
            });
            let authors = Object.keys(obj);
            console.log(authors);
            setAuthorOptions([...authors]);

            let obj2 = {};
            resp.data.map((el) => {
              obj2[el.category] = 1;
            });
            let categories = Object.keys(obj2);
            setCategoriesOptions([...categories]);
          }
          setData(resp.data);
        } else {
          alert(resp.message);
        }
      });
  }, [author, category]);

  return (
    <div id="AllBlogs">
      <div className="filter">
        <TextField
          select
          margin="normal"
          fullWidth
          label="Filter By Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <MenuItem value={"all"}>All Authors</MenuItem>
          {authorsOption.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          margin="normal"
          fullWidth
          label="Filter By Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={"all"}>All Categories</MenuItem>
          {categoriesOption.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div id="blogs-cont">
        {loader ? (
          ""
        ) : data.length == 0 ? (
          <h1>No Data Found</h1>
        ) : (
          data.map((el, i) => {
            return (
              <div className="card" key={i}>
                <div style={{ backgroundImage: `url(${el.image})` }}></div>
                <div>
                  <h1>{el.title}</h1>
                  <hr />
                  <h3>
                    Author: <span>{el.author}</span>
                  </h3>
                  <h3>
                    Category: <span>{el.category}</span>
                  </h3>
                  <p>{el.content}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllBlogs;
