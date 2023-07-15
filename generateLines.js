const turf = require('@turf/turf');

function generateLines() {
    //creating array to store lines
    const lines = turf.featureCollection([]);

    //creating and pushing lines to the array
    for(let i=1; i<=50; i++){
        //generating random points for line
        const firstPoint = turf.randomPosition();
        const secondPoint = turf.randomPosition();

        const line = turf.lineString([firstPoint, secondPoint], {id:`L${i.toString().padStart(2, '0')}`});

        lines.features.push(line);
    }

    return lines;
}

module.exports = {generateLines};