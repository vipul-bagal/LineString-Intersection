# LineString-Intersections
This is a Node.js application that provides an API for finding intersections between a given LineString and scattered lines using the Turf.js library.
This API is built using Express and Node.js and utilizes the Turf.js librabry for geometric calculations.

## Requirements
- Node.js
- Express.js
- Turf.js librabry

## Installation

1. Clone the repo to local machine.
2. Navigate to the project folder in the terminal.
3. Install the dependencies by running the following command:
    npm install

## How to use
1. Use the following command to start the server.
    node server.js
The server will start running on port 5001.
API Endpoint: 'http://localhost:5001/intersect'

## Request Body
The request body of this application looks like the following.
As many coordinates as want can be added to this request.

{
  "type": "LineString",
  "coordinates": [
    [-96.79512, 32.77823],
    [-96.79469, 32.77832],
    ...
    [-96.64452, 32.86115]
  ]
}

## How to test API using POSTMAN

1. Keep the app running on localhost.
2. Create new request in Postman with method as a POST.
3. Enter the following URL.
    'http://localhost:5001/intersect'
4. Go to headers tab and add the following key-value pairs.
    'Content-Type' : application/json
    'Authorization' : 'Bearer mapup'
5. Go to Body tab 
    a. select the 'binary' option and browse and select the json file.
    b. select the 'raw' as an option and paste the JSON data into text field.
You can download the JSON file from here. ->  https://bit.ly/3krGkTN 
6. Press the send button and check the output.

