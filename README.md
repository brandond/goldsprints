# Goldsprints

An attempt to build an application for [Goldsprint competition](https://en.wikipedia.org/wiki/Goldsprint) with Arduino, Python and React.

![goldsprints](https://cloud.githubusercontent.com/assets/5421321/24585852/423c5fec-1794-11e7-9653-43f4c8cdb2df.png)

## How it works
1. We use Arduino with two Hall sensors to measure the speed of the bike rollers.
2. Measurements are sent to a Python script that sends them through WebSocket to the browser.
3. We use Django as a backend for storing data about races and players.
4. Dynamic pages that display speed and distances of players during a race are rendered in React.

## Installation on Docker
You can build and run application inside the docker container:

1. Build docker image: `docker build . -t goldsprints:latest`
2. Start container: `docker-compose up -d`
3. Go to `http://localhost:8000` in your browser to access the application

## Hardware
The websocket server handles multiplexing JSON data from the Arduino serial stream to multiple viewers.
Arduino code to output compatilble data is available at https://github.com/brandond/blackpillsprints.

## Available modes
- Event - a group of races - allows to create and perform a sequence of races by entering pairs of players
- Quick race - a quick race between two players
- Free ride - it just reads speed and distance from sensors and display them on screen

## Disclaimer
* Originally a hobby project made by @elwoodxblues and @ssaleta for Polish Cycle Messenger Championships which took place in Wrocław in 2016.
* Modernized and refactored by @brandond in 2025, to support modern versions of Python and node.js, and delegate speed and timing calculations to the embedded processor.
