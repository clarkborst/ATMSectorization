# Human-Machine Interface for (generic) ATM sectorization with algorithmic/AI support

Standalone Javascript project, using NodeJS and D3 library, demonstrating interactive Voronoi polygons with:
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

## Oz Assistant

Besides manually solving a challenging sectorization problem, it is possible to 'replay' commands and display text messages defined in JSON file. This can be used to test-drive the 
information exchange and workflow between a 'fake' AI agent-- like a 'Wizard of Oz'--supporting the human in trying to solve the sectorization problem. The actions defined in the file can 
run sequentially or timed.

Example:

JSON
----

```json
{
  "options": {
    "sequential": true,
    "stepDelay": 1500
  },
  "items": [
    {
      "time": 3000,
      "message": "Hello! I’m Oz, your scripted assistant here to support your sectorization efforts.\n\n",
      "repeat": 0,
      "interval": 7000,
      "maxRuntime": 300000
    },
    {
      "time": 13000,
      "command": "addPoint",
      "args": [100, 150],
      "requiresConfirmation": true,
      "explanation": "A new point at (100, 150) will improve robustness by 15%.",
      "previewable": false
    },
    {
      "time": 25000,
      "message": "That's it! No more items are scheduled."
    }
  ]
}
```

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












