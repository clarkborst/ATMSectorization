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

To run the application, you need to run <code>index.html</code> as a server. To do that, 
  - download and install **Visual Studio Code**
  - install extension *Live Server*
  - in the explorer view, right click <code>index.html</code> and select <code>Open with Live Server</code>

<img width="1708" height="908" alt="image" src="https://github.com/user-attachments/assets/74b62960-888d-4bac-9de8-a01fab386163" />


Now you can directly interact with the default environment. Some useful pointers to start:
  - move Voronoi point: left mouse drag
  - delete Voronoi point: right click opens context menu, select <code>remove point</code>
  - add Voronoi point: position mouse pointer where you want to add a point, right click to open context menu, select <code>add point</code>
  - switch between Voronoi/Polygon mode: position mouse pointer not on Voronoi point, right click to open context menu, shows current mode, select <code>mode:</code> to switch mode
  - cluster (k-means) Voronoi points: go to <code>Graph</code> tab, right click anywhere on the map outside a Voronoi point, select <code>cluster</code>
  - animate (aircraft) particles over time: drag the time slider at the left bottom
  - activate 'no-go' areas to trigger airway re-routing: when in <code>Environment</code> tab, press and hold the <code>CTRL</code> key (reveals a grid), activate 'no-go' areas by left click and drag while holding <code>CTRL</code> pressed, release <code>CTRL</code> key to left pathfinder (default: Theta*) re-route airways to circumvent activated grid cells
  - deactivate 'no-go' areas:  when in <code>Environment</code> tab, press and hold the <code>CTRL</code> key (reveals a grid), deactivate 'no-go' areas by right click and drag while holding <code>CTRL</code> pressed, release <code>CTRL</code> key to left pathfinder (default: Theta*) re-route airways
  - show predicted aircraft/particle count over time in sector/cell: in <code>Chart</code> tab, left click a barchart, reveals line chart rperesenting predicted particle count over 120 minutes (2 hrs). Left click on line chart again goes back to bar chart view
  - change settings: go to <code>Settings</code> tab to show/hide visual elements and change settings
  - saving and loading: go to <code>Settings</code> tab and save Environment as JSON file or SVG. Click <code>Load from JSON</code> to open a JSON file (NAV Portugal Santa Maria airspace available as example)   


## Oz Assistant

Besides manually solving a challenging sectorization problem, it is possible to 'replay' commands and display text messages defined in JSON file. This can be used to test-drive the 
information exchange and workflow between a 'fake' AI agent (like a 'Wizard of Oz') supporting the human in trying to solve the sectorization problem. The action items defined in the file can 
either run sequentially or timed.

Example JSON script to put in the folder <code style="color🍏">data/oz/</code>:

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

## Live Assistant (Untested, work in progress!!)

It is also possible to interact with the environment via an external Python application. Here, the Javascript application serves as a frontend (server), while an external Python script (client)
can send JSON strings to display messages and execute commands. The Javascript application listens for incoming JSON messages and send JSON reports back to the Python script via WebSocket. 

<code style="color:red">**NOTE**: make sure to run the Javascript application as server in the browser before running the Python script!</code>

Here is an example Python script to get you started:

Python
----

```python
import asyncio
import websockets
import json

async def talk_to_browser():
    uri = "ws://localhost:8080/ws"   # must match config.json in JS

    async with websockets.connect(uri) as websocket:
        print("[Python] Connected to browser assistant")

        # Example 1: send a text message
        await websocket.send(json.dumps({
            "message": "Hello from Python client!"
        }))

        # Example 2: send a valid command
        await websocket.send(json.dumps({
            "command": "addPoint",
            "args": [200, 150],
            "requiresConfirmation": true,
            "explanation": "A new point at (200, 150)",
            "previewable": false
        }))

        # Example 3: send an invalid command
        await websocket.send(json.dumps({
            "command": "addPoint",
            "args": [200, -10],
            "requiresConfirmation": true,
            "explanation": "A new point at (200, -10)",
            "previewable": false
        }))

        # Example 4: request to retrieve data
        await websocket.send(json.dumps({
            "command": "getNumCells",
        }))

        # Listen for replies from the browser
        while True:
            try:
                response = await websocket.recv()
                data = json.loads(response)
                print("[Python] Received from browser:", json.dumps(data, indent=2))

                if data.get("type") == "error":
                    print(f"❌ Browser reported error: {data['reason']}")
                elif data.get("type") == "confirmation":
                    print(f"✅ Browser confirmed command {data['command']} with args {data['args']}")

            except websockets.exceptions.ConnectionClosed:
                print("[Python] Connection closed by browser")
                break

if __name__ == "__main__":
    asyncio.run(talk_to_browser())
```

### Currently supported commands

#### Display a text message

```json
{
    "message": "Hello from Python!"
}
```
---
#### Initialize a random environment

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
    "explanation": "Creating a new Voronoi point, because...",
    "requiresConfirmation": true,
    "previewable": false
}
```
---

#### Delete a Voronoi point

```json
{
    "command": "removePoint",
    "args": index,
    "explanation": "Removing a new Voronoi point, because...",
    "requiresConfirmation": true,
    "previewable": false
}
```
---

#### Move a Voronoi point

```json
{
    "command": "movePoint",
    "args": [index, x, y],
    "explanation": "Moving a new Voronoi point, because...",
    "requiresConfirmation": true,
    "previewable": false
}
```
---

#### Get cell complexity statistics

```json
{
    "command": "getCellStats",
    "args": index,
}
```
if index is valid, returns:
```json
{
    "type": "confirmation",
    "command": "getCellStats",
    "status": "success",
    "args": index,
    "stats": {
        "min" :  a,
        "max" :  b,
        "mean":  c,
        "std" :  d
    }
}
```

if index is invalid, returns:
```json
{
    "type": "error",
    "command": "getCellStats",
    "reason": "Cell does not exist",
    "args": index,
    "constraints": {
        "index": [0, numCells-1] 
    }
}
```
---

## Authors and acknowledgment
Created by Clark Borst.

## License
GNU GPL 3.0

## Project status
Alpha release




























































