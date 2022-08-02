import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux/es/exports";
import { showUserActons } from "../store/showUserSlice";
import SearchBar from "material-ui-search-bar";

const Todos = () => {
  const [data, getData] = useState([]);
  const [load, setLoad] = useState(true);
  const [rows, setRows] = useState([]);
  var details = [];
  const dispatch = useDispatch();

  const url = "https://jsonplaceholder.typicode.com/todos";

  const fetchData = async () => {
    console.log("hui");
    try {
      setLoad(true);
      const response = await fetch(url);
      const responseData = await response.json();
      console.log("hui", responseData);

      getData(responseData);

      setRows(data);

      setLoad(false);

      //console.log(rows, data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();

    console.log("hi");
  }, []);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const showStatus = (dta) => {
    if (dta) {
      return "complete";
    } else return "incomplete";
  };

  const viewUser = (todoID, title, userID) => {
    console.log(todoID);
    dispatch(showUserActons.showUserData());
    dispatch(showUserActons.getDetails({ todoID, title, userID }));
  };

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    if (searchedVal === "") {
      setRows(data);
    } else {
      const filteredRows = data.filter((row) => {
        return row.title.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
      //console.log(filteredRows);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const [currentSort, nextSort] = useState(true);
  const onSortChange = async () => {
    if (currentSort) {
      fetchData();

      details = rows.sort((a, b) => b.id - a.id);

      setTimeout(() => {
        setRows(details);
      }, 500);
    } else setRows(data);

    nextSort(!currentSort);

    //console.log(details);
    
  };

  return (
    <TableContainer component={Paper} width="50%">
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Todos ID
              <button onClick={onSortChange}>▲▼</button>
            </TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {load ? (
            <p>loading.... </p>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{showStatus(row.completed)}</TableCell>
                <TableCell align="center">
                  <button
                    type="button"
                    onClick={() => viewUser(row.id, row.title, row.userId)}
                    class="btn btn-primary"
                  >
                    View User
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Todos;
