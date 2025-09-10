# Human-Machine Interface for generic ATM sectorization with algorithmic support

Simple Javascript project, using NodeJS and D3 library, demonstrating interactive Voronoi polygons with:
- clipping to an "outer" polygon
- visualizing violation of various sectorization constraints (e.g., minimal line length, line crossing points being too close to polygon edges, etc.)
- geometric "complexity" monitor per polygon
- human interaction and animation capabilities (i.e., dragging Voronoi centers)
- particles following the lines + conflict detection
- k-means clustering for sectorization (incl. ARI cluster stability metric)
- classic pathfinding algorithms to generate new lines avoiding static obstacles
- saving and loading to JSON (handy for Python as well) and SVG

It is used as a prototype demonstrator and a baseline human-machine interface for Dynamic Airspace Sectorization (DAS) within the AI4REALNET EU project.

## Getting started

To run the application, just open the index.html in your browser. It requires the precompiled Javascript library in the subfolder /bundle/voronoi.js.  

## Authors and acknowledgment
Created by Clark Borst.

## License
GNU GPL 3.0

## Project status
Alpha release



