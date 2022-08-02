import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserDetail = () => {
  const [data, getData] = useState([]);
  const newUser = useSelector((state) => state.showUser.userDetails);

  console.log(newUser);

  var todoid = newUser.todoID;
  var title = newUser.title;
  var user = newUser.userID;
  console.log(todoid);
  console.log(title);
  console.log(user);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users/" + user;
    console.log(url);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        getData(responseData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h5 class="card-head mt-2">User Detail</h5>
      </div>

      <div class="mt-5">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>Todo ID:</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{todoid}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Todo Title:</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{title}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>User ID :</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{data.id}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Name:</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{data.username}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Email :</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{data.email}</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default UserDetail;
