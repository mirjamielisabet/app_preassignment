import * as React from "react";
import {
  Divider,
  IconButton,
  TextField,
  Box,
  List,
  ListItemButton,
  ListItemText,
  TablePagination,
  Paper,
} from "@mui/material";
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
    <Paper className="dataList">
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
        {filterBy(props.data).length === 0 && (
          <div className="noresults">No results found</div>
        )}
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
    </Paper>
  );
};

export default StationList;
