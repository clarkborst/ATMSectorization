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
information exchange and workflow between a 'fake' AI agent (like a 'Wizard of Oz') supporting the human in trying to solve the sectorization problem. The actions defined in the file can 
either run sequentially or timed.

Example:

json
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

It is also possible to interact with the environment via an external Python application. Here, the Javascript application serves as a frontend , while an external Python script
can send JSON strings to display messages and execute commands. The Javascript application listens for incoming JSON messages and send JSON structures back with information to the Python script via WebSockets. 

<code style="color:red">**NOTE**: make sure to run the Javascript application as server in the browser before running the Python script!</code>

Here is a Python script example:

Python
----

```python
import asyncio
import websockets
import json

async def send_messages():
    uri = "ws://localhost:8080"
    async with websockets.connect(uri) as websocket:
        await websocket.send(json.dumps({
            "message": "Hello from Python!"
        }))
        await asyncio.sleep(1)

        await websocket.send(json.dumps({
            "command": "addPoint",
            "args": [100, 200],
            "explanation": "Creating a new Voronoi point",
            "requiresConfirmation": true,
            "previewable": false
        }))

asyncio.run(send_messages())
```

### Currently supported commands

#### Displaying a text message

```json
{
    "message": "Hello from Python!"
}
```
---
#### Initializing a random environment

```json
{
    "command": "initRandom",
    "args": [width, height, numVoronoiPoints, numLines, numParticlesPerLine]
}
```
---
#### Add a Voronoi point

```json
{
    "command": "addPoint",
    "args": [x, y],
    "explanation": "Creating a new Voronoi point",
    "requiresConfirmation": true,
    "previewable": false
}
```

#### Delete a Voronoi point

```json
{
    "command": "removePoint",
    "args": index,
    "explanation": "Removing a new Voronoi point",
    "requiresConfirmation": true,
    "previewable": false
}
```

#### Move a Voronoi point

```json
{
    "command": "movePoint",
    "args": [index, x, y],
    "explanation": "Moving a new Voronoi point",
    "requiresConfirmation": true,
    "previewable": false
}
```

#### Get cell complexity statistics

```json
{
    "command": "getCellStats",
    "args": index,
}
```
returns:
```json
{
    type: "confirmation",
    command: "getCellStats",
    status: "success",
    args: i,
    stats: {
        mean: [],
        min: [],
        max: [],
        std: []
    }
}
```

## Authors and acknowledgment
Created by Clark Borst.

## License
GNU GPL 3.0

## Project status
Alpha release




































