//importing packages
const express = require('express');
const bodyParser = require('body-parser');
const turf = require('@turf/turf');
const { generateLines } = require('./generateLines');
const { authenticate } = require('./authenticate')

const app = express();
//port
const port = 5001;

app.use(bodyParser.json());

app.post("/intersect", authenticate, (req, res) => {
    console.log(req.body);
    const lineString = req.body;

    if ( !lineString || !lineString.coordinates || lineString.coordinates.length == 0 ) {
        res.status(400).json({ error: "Invalid lineString!" });
        return;
    }

    try {
        //converting the JSON lineString into turf lineString
        const newLineString = turf.lineString(lineString.coordinates);
        console.log(newLineString); 

        //generating scattered lines
        const lines = generateLines();
        console.log(lines);

        //finding intersections using turf intersect
        const intersections = turf.lineIntersect(newLineString, lines);
        console.log(intersections);

        //if no intersections found
        if (intersections.features.length == 0) {
            res.json([]);
        } else {
            const intersectingLineIDs = intersections.features.map((feature) => {
                return {
                    id: feature.properties.id,
                    point: feature.geometry.coordinates,
                };
            });
            console.log(intersectingLineIDs);
            res.json(intersectingLineIDs);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Invalid lineString" });
    }
});

app.listen(port, () => {
    console.log(`On port ${port}`);
});
