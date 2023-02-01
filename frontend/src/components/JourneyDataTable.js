import * as React from "react";
import "../App.css";
import PropTypes from "prop-types";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Divider,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

/**
 * Compares the rows by the value of the given column (orderBy).
 * @param {Object} a - Row to be compared
 * @param {Object} b - Row to be compared
 * @param {string} orderBy - The column by which the table will be sorted
 * @returns a comparator value
 */
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

/**
 * Creates the comparator function according to the sort order.
 * @param {string} order - The order of the sorting (desc or asc)
 * @param {string} orderBy - The column by which the table will be sorted
 * @returns the comparator function
 */
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

/**
 * Sorts the table rows.
 * Stable sort brings stability to non-modern browsers.
 * @param {Array} array - The rows to be sorted
 * @param {Function} comparator - The comparator function
 * @returns sorted rows
 */
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Properties for the headcells of the data table.
 */
const headCells = [
  {
    id: "departureTime",
    numeric: false,
    disablePadding: false,
    label: "Departure Time",
  },
  {
    id: "departureStation",
    numeric: false,
    disablePadding: false,
    label: "Departure Station",
  },
  {
    id: "returnTime",
    numeric: false,
    disablePadding: false,
    label: "Return Time",
  },
  {
    id: "returnStation",
    numeric: false,
    disablePadding: false,
    label: "Return Station",
  },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Duration (min)",
  },
  {
    id: "distance",
    numeric: true,
    disablePadding: false,
    label: "Distance (km)",
  },
];

/**
 * The table head of the journey data table.
 * @param {Object} props
 * @param {string} props.order - The order of the sorting (desc or asc)
 * @param {string} props.orderBy - The column by which the table will be sorted
 * @param {Function} props.onRequestSort - Function for handling the sort request
 * @returns The table head component of the journey data table
 */
const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{
              fontWeight: "bold",
            }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

/**
 * Validation for the Enhanced table head's props.
 */
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

/**
 * The toolbar of the journey data table.
 * @param {Object} props
 * @param {boolean} props.showFilterOptions - Tells if the filtering options are visible or not
 * @param {Function} props.handleFilterClick - Function for handling the filter icon click
 * @param {Function} props.handleChangeFilter - Function for handling the change of a filter value
 * @param {Function} props.setPage - Function for setting the page number
 * @returns The toolbar component of the journey data table
 */
const EnhancedTableToolbar = (props) => {
  const [text, setText] = React.useState({
    departureStation: "",
    returnStation: "",
  });

  /**
   * Handles the change in a search field and saves the input value to the state.
   * The input value is passed on to the handleChangeFilter function.
   * Sets the page to be the first page.
   * @param {Object} event
   */
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setText({ ...text, [name]: value });
    props.handleChangeFilter({
      ...text,
      [name]: value,
    });
    props.setPage(0);
  };

  /**
   * Clears the content of the search field.
   * Sets the page to be the first page.
   * @param {Object} event
   */
  const clearText = (event) => {
    const name = event.target.name;
    setText({ ...text, [name]: "" });
    props.handleChangeFilter({
      ...text,
      [name]: "",
    });
    props.setPage(0);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Helsinki City Bike Journeys
      </Typography>
      {props.showFilterOptions ? (
        <Paper
          sx={{
            width: "800px",
            margin: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            alignItems="center"
            paddingTop={1}
            paddingLeft={1.5}
            paddingRight={1.5}
          >
            <FilterListIcon
              sx={{
                fontSize: 20,
              }}
            />
            <Typography variant="body2" width={250} textAlign={"left"}>
              Departure Station
            </Typography>
            <TextField
              sx={{
                paddingBottom: 2,
              }}
              variant="standard"
              label="Search"
              name="departureStation"
              size="small"
              value={text.departureStation}
              onChange={handleChange}
              fullWidth
            />
            <Button
              variant="outlined"
              size="small"
              name="departureStation"
              onClick={clearText}
            >
              Clear
            </Button>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            alignItems="center"
            paddingTop={1}
            paddingLeft={1.5}
            paddingRight={1.5}
          >
            <FilterListIcon
              sx={{
                fontSize: 20,
              }}
            />
            <Typography variant="body2" width={250} textAlign={"left"}>
              Return Station
            </Typography>
            <TextField
              sx={{
                paddingBottom: 2,
              }}
              variant="standard"
              label="Search"
              size="small"
              name="returnStation"
              value={text.returnStation}
              onChange={handleChange}
              fullWidth
            />
            <Button
              variant="outlined"
              size="small"
              name="returnStation"
              onClick={clearText}
            >
              Clear
            </Button>
          </Stack>
          <Divider />
        </Paper>
      ) : (
        ""
      )}
      <Tooltip title={props.showFilterOptions ? "Close" : "Filter"}>
        <IconButton onClick={props.handleFilterClick}>
          {props.showFilterOptions ? <HighlightOffIcon /> : <FilterListIcon />}
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

/**
 * A component containing a table of the city bike journeys.
 * @param {Object} props
 * @param {Array} props.data - Information about the city bike journeys
 * @returns A table containing information about the city bike journeys
 */
const JourneyDataTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("departureTime");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showFilterOptions, setShowFilterOptions] = React.useState(false);
  const [filter, setFilter] = React.useState({
    departureStation: "",
    returnStation: "",
  });

  const rows = props.data;

  /**
   * Formats the date and time to be more readable.
   * @param {string} dateString - A date and time formatted as a string
   * @returns the reformatted date string
   */
  const formatDate = (dateString) => {
    let date = new Date(dateString);
    let dt = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    let newDateString = `${dt}.${month}.${year} ${hours}:${minutes}`;
    return newDateString;
  };

  /**
   * Handles the sort request.
   * @param {Object} event
   * @param {string} property - the property (column) by which the table is sorted
   */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
   * Handles the request of changing the table density.
   * @param {Object} event
   */
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  /**
   * Handles the click of the filter icon.
   * Shows or hides the filter options.
   */
  const handleFilterClick = () => {
    showFilterOptions
      ? setShowFilterOptions(false)
      : setShowFilterOptions(true);
  };

  /**
   * Handles the change of the filtering value.
   * Saves the new filter value to the state.
   * @param {Object} value - The filter value
   */
  const handleChangeFilter = (value) => {
    setFilter(value);
  };

  /**
   * Filters the rows by the input of the search fields.
   * @param {Array} rows - The rows to be filtered
   * @returns filtered rows
   */
  const filterBy = (rows) => {
    if (filter.departureStation === "" && filter.returnStation === "") {
      return rows;
    }

    if (filter.returnStation !== "" && filter.departureStation !== "") {
      return rows.filter(
        (value) =>
          value.departureStation
            .toLowerCase()
            .includes(filter.departureStation.toLowerCase()) &&
          value.returnStation
            .toLowerCase()
            .includes(filter.returnStation.toLowerCase())
      );
    } else if (filter.departureStation === "") {
      return rows.filter((value) =>
        value.returnStation
          .toLowerCase()
          .includes(filter.returnStation.toLowerCase())
      );
    } else {
      return rows.filter((value) =>
        value.departureStation
          .toLowerCase()
          .includes(filter.departureStation.toLowerCase())
      );
    }
  };

  /**
   * Avoid a layout jump when reaching the last page with empty rows.
   */
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterBy(rows).length)
      : 0;

  return (
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          showFilterOptions={showFilterOptions}
          handleFilterClick={handleFilterClick}
          handleChangeFilter={handleChangeFilter}
          setPage={setPage}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(filterBy(rows), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell>{formatDate(row.departureTime)}</TableCell>
                      <TableCell>{row.departureStation}</TableCell>
                      <TableCell>{formatDate(row.returnTime)}</TableCell>
                      <TableCell>{row.returnStation}</TableCell>
                      <TableCell align="right">
                        {Math.round((row.duration / 60) * 10) / 10}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round((row.distance / 1000) * 100) / 100}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {filterBy(rows).length === 0 && (
                <div className="noresults">No results found.</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 75]}
          component="div"
          count={filterBy(rows).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default JourneyDataTable;
