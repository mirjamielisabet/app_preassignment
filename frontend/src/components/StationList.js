import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TablePagination from "@mui/material/TablePagination";
import { Divider } from "@mui/material";

const StationList = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleListItemClick = (event, index) => {
    event.preventDefault();
    props.onClick(index);
  };

  return (
    <Box
      className="dataTable"
      sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
    >
      <List component="nav" aria-label="stationList">
        {props.data
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
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default StationList;
