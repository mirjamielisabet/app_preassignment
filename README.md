## Helsinki City Bike App

The App displays data from journeys made with city bikes in the Helsinki Capital area. 
It also provides a list of all the city bike stations and a brief information about them.

This app has been created as a pre-assignment.

## Features

- **Journey table view:** A table containing information about city bike journeys made in May 2021. For each journey the departure and return station, departure and return time, covered distance in kilometers and duration in minutes are shown. Each column can be ordered and (frontend) pagination is implemented. There is also a possibility to filter the table by searching a departure station or/and a return station.

- **Station list view:** A list of all the city bike stations. Pagination (frontend) and searching are implemented. By clicking a station name a single station view is shown.

- **Single station view:** Information about a single station. Shows station name, address, capacity, number of journeys starting from the station and number of journeys ending at the station.

## Screenshots

<img width="450" alt="screenshot1" src="https://user-images.githubusercontent.com/77788900/216107473-4f86a0bf-6941-40eb-be2c-af15ab119c43.png"> 
<img width="450" alt="screenshot2" src="https://user-images.githubusercontent.com/77788900/216107816-122b4f67-79dd-4baa-a95d-7412241d922a.png">
<img width="450" alt="screenshot3" src="https://user-images.githubusercontent.com/77788900/216107831-480216b6-b7e4-4eb6-bfe5-12072bfb92c4.png">
<img width="450" alt="screenshot4" src="https://user-images.githubusercontent.com/77788900/216107847-5331b124-399a-4cbb-919a-da5bbc269b00.png">

## Technologies / Built with

- Frontend: React, [React Router](https://github.com/remix-run/react-router), [Axios](https://github.com/axios/axios), [Material.ui](https://mui.com/) library
- Backend: [Express](https://expressjs.com/), Node.js, MySQL

## How to use

## Features not yet implemented / improvement ideas

- Only one of the three available journey datasets were imported to the database. In order to load all three datasets, backend pagination should be implemented
- Since the journey data consists of many rows of information, the table pagination should have the option to select the page number instead of plain arrows
- The station list should remember what page it was on (and whether search terms were inputted) before the list item click: then user could return to that page when closing the single station view
