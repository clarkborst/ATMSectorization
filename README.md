# Human-Machine Interface for (generic) ATM sectorization with algorithmic/AI support

Javascript project, using NodeJS and D3 library, demonstrating interactive Voronoi polygons with:
- clipping to an "outer" polygon
- visualizing violation of various sectorization constraints (e.g., minimal line length, line crossing points being too close to polygon edges, etc.)
- geometric "complexity" monitor per polygon
- human interaction and animation capabilities (i.e., dragging Voronoi centers)
- particles following the lines + conflict detection
- k-means clustering for sectorization (incl. ARI cluster stability metric)
- classic pathfinding algorithms to generate new lines avoiding static obstacles
- saving and loading to JSON (handy for Python as well) and SVG

It is used as a prototype demonstrator and a baseline human-machine interface for Dynamic Airspace Sectorization (DAS) within the [AI4REALNET HORIZON-EU project](https://ai4realnet.eu/).

## Running the application

To run the application, just open the index.html in your browser. It requires the precompiled Javascript library in the subfolder /bundle/voronoi.js.  

## Wizard-of-Oz Assistant

It can 'replay' commands and display text messages defined in JSON file. This can be used to test-drive the information exchange workflow between a 'fake' AI agent supporting the human in
trying to solve the sectorization problem.

## Live Assistant

It is possible to interact with the environment

### Adding a Voronoi point

JSON
----

```json
{
    "one": 2,
    "three": {
        "point_1": "point_2",
        "point_3": 3.4
    },
    "list": [
        "one",
        "two",
        "three"
    ]
}
```

That was my JSON code block.




## Authors and acknowledgment
Created by Clark Borst.

## License
GNU GPL 3.0

## Project status
Alpha release








