# Getting Started

- Please read the INSTRUCTIONS.md first
- For any questions around Create React App (CRA), reference
  CRA_DOCUMENTATION.md

# Code and Design Decisions

Install dependencies
> npm install

Run App:
> npm start

Run Tests:
> npm test

Can be accessed via:
> http://localhost:3000/properties

## Design decisions:
1. Route "Properties" was defined in index.js and allows for nesting of routes for future pages.
2. Homepage route ("/") was left blank with the assumption that this page is just a section in the site and not the main component.
3. Property listings results from API call are stored in Local Storage as an array of objects.
4. Favorite property IDs are stored as a Set in Local Storage to ensure uniqueness.
5. SASS was used for CSS.
6. Cutoff resolution of 930px was selected for mobile view since only two layouts were provided and the three column layout could not fit below that resolution. If there was a two column layout, single column layout would only be displayed at 600px and below.  
7. PropertyListing component contains a single listing. 
8. PropertyListings component handles the API call, local storage and rendering of page.

## Tests: 
1. Title is rendered - to ensure the app loads as expected.
2. API call data is displayed on screen - to ensure the API endpoint is working and the data model has not changed.
3. Favorite button changes status on click - to ensure the visual part of Favorites functionality is working.

## Items left out due to time constraints:
1. Testing functionality of Favorites to ensure the IDs saved are correct.
2. Convert state name from full (California) to abbreviation (CA) per Figma design.