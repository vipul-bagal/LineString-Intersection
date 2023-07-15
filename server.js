//importing packages
const express = require('express');
const bodyParser = require('body-parser');
const turf = require('@turf/turf');
const { generateLines } = require('./generateLines');
const { authenticate } = require('./authenticate');

const app = express();
//port
const port = 5001;

app.use(bodyParser.json({ limit: '50mb' }));

app.post("/intersect", authenticate, (req, res) => {

    try {
        //console.log(req.body);
        // Check if linestring file is missing
        if (!req.body || req.body.type !== 'LineString') { 
            res.status(400).json({ error: 'Linestring file is missing!' });
            return;
        }

        // Parse the linestring from the file buffer
        const lineString = req.body;
        //console.log(lineString);

        // Check if the linestring is valid
        if (!lineString || lineString.type !== 'LineString' || lineString.coordinates.length === 0) {
            res.status(400).json({ error: "Invalid lineString!" });
            return;
        }

        // Convert the linestring to turf lineString
        const newLineString = turf.lineString(lineString.coordinates);

        // Generate scattered lines
        const lines = generateLines();

        // Find intersections using turf lineIntersect
        const intersections = turf.lineIntersect(newLineString, lines);

        // Return the intersecting line IDs and points of intersection
        if (intersections.features.length === 0) {
            res.json([]);
        } else {
            const intersectingLineIDs = intersections.features.map((feature) => ({
                id: feature.properties.id,
                point: feature.geometry.coordinates,
            }));
            res.json(intersectingLineIDs);
        }
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: "Invalid lineString" });
    }
});

app.listen(port, () => {
    console.log(`On port ${port}`);
});
