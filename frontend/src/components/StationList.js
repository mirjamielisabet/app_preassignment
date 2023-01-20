import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TablePagination from "@mui/material/TablePagination";
import { Divider, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const StationList = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleListItemClick = (event, index) => {
    props.onClick(index);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPage(0);
  };

  const clearText = (event) => {
    setSearch("");
  };

  const filterBy = (rows) => {
    if (search === "") {
      return rows;
    }

    return rows.filter((value) =>
      value.stationName.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Box
      className="dataTable"
      sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          label="Search"
          variant="standard"
          onChange={handleChange}
          value={search}
          fullWidth
        />
        {search !== "" && (
          <IconButton onClick={clearText}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      <List component="nav" aria-label="stationList">
        {filterBy(props.data)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data, index) => {
            return (
              <ListItemButton
                key={index}
                onClick={(event) => handleListItemClick(event, data.id)}
              >
                <ListItemText primary={data.stationName} />
              </ListItemButton>
            );
          })}
      </List>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filterBy(props.data).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default StationList;
