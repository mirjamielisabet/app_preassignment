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
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * A component containing a list of city bike stations.
 * @param {Object} props
 * @param {Array} props.data - City bike station names and ids
 * @param {Function} props.onClick - Function for handling a list item click
 * @returns The list of the city bike stations
 */
const StationList = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  /**
   * Handles the page change.
   * @param {Object} event
   * @param {number} newPage - the number of the new page
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handles the change of rows per page.
   * Sets the page to be the first page.
   * @param {Object} event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Handles a click of the list item.
   * @param {Object} event
   * @param {number} index - The index (id) of the clicked list item
   */
  const handleListItemClick = (event, index) => {
    props.onClick(index);
  };

  /**
   * Handles the change in the search field and saves the input value to the state.
   * Sets the page to be the first page.
   * @param {Object} event
   */
  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPage(0);
  };

  /**
   * Clears the content of the search field.
   * Sets the page to be the first page.
   * @param {Object} event
   */
  const clearText = (event) => {
    setSearch("");
    setPage(0);
  };

  /**
   * Filters the rows by the input of the search field.
   * @param {Array} rows - The rows to be filtered
   * @returns filtered rows
   */
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
      <Typography variant="h6" sx={{ paddingBottom: 2 }}>
        Helsinki City Bike Stations
      </Typography>
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
