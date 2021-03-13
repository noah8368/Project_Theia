# Project Theia

###### Noah Himed, Arthur Lovekin, Julia Offerman, Joseph Pinto, and Nabeel Shaikh
###### 12 March 2021

## Introduction

Project Theia is a full stack web app that gives users the ability to see
websites may look in other locations based on a browser’s built-in geolocation
settings. A common problem in the development of a web application that creators
often run across is the inconvenience of seeing how a website looks from other
locations in the world. While one can change the internal setting of their
browser manually, doing so for several sites in a non-automated manner is
tedious and time consuming. Project Theia is a convenience application which
serves to automate the task of viewing sites based on different spoofed
locations and save users time in their pursuit to ensure that a website meets
the language and format requirements of users across the world.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Selenium Bindings](https://selenium-python.readthedocs.io/installation.html)
- [Selenium Chrome Driver](https://selenium-python.readthedocs.io/installation.html)
- [Validators](https://pypi.org/project/validators/)
- The local machine's public IPv4 must be whitelisted on the MongoDB Atlas cluster

### Environment Setup
Execute the following commands in a POSIX to install any needed dependencies
and properly set up the local environment.
```
chmod u+x setup.sh
./setup.sh
```

## Usage

To start the application, run the script `start.sh`. To close the application,
you must run the script `stop.sh` before running another instance of the app.
Failing to do so will leave `Node.js` running in the background.

## Implementation

There are four main elements that make up the application architecture of
Project Theia: the Web Recorder Python script, the MongoDB database,
the Express/Node.js back-end, and then React front-end.

The Web Recorder script consists of a single Python file which mainly defines
and implements a class that takes in a series of parameters and uses them in
conjunction with the Selenium library to save a screenshot of a website viewed
from a browser with a spoofed geolocation. Chronologically, the following events
occur: the Argparse library defines and accepts a website URL, coordinates, and
other optional parameters mainly dictating output. In the constructor of a
WebRecorder object, these parameters are checked for validity, and an exception
is thrown if any bad parameters were entered. Then, the Selenium library is used
to run a headless instance of Google Chrome with a spoofed set of coordinates,
and a screenshot is taken of the browser when visiting the specified URL.
Finally, the screenshot is saved to the local file system to be used by the
React front end to display to a user.

The MongoDB database is essentially an Atlas cluster within which we have
instantiated a database to store user information. In particular, each document
in the database contains a username and an array of favorites which stores all
of the favorite websites that a user specifies. For new users, the favorites
array is initialized by default to contain only one website: https://www.google.com/.
As we’ll see, however, additional favorites can be added rather easily
from the front-end.

The Express back-end consists of a Node.js server that contains several
endpoints which serve different purposes. The most important ones are
get(/user/:username), post(/push), and post(/pyargs). The get(/user/:username)
endpoint is called by the front-end to get a user’s favorites and works by
taking a username as a parameter, searching for a user that matches the
specified username in the database, and returning said user’s favorites.
The post(/push) endpoint is called by the front-end to update a user’s favorites
and works by taking a username and favorites as parameters, searching for a user
that matches the specified username in the database, and updating said user’s
favorites. The post(/pyargs) endpoint is called by the front-end to trigger the
Web Recorder Python script and works by taking a URL, latitude, and longitude as
parameters, spawning a child process, and executing the Web Recorder Python
script with appropriate arguments within that child process. In other words, the
back-end serves as a rallying point for the Python script, database, and
front-end to be able to interface with one another and exchange the necessary
data to make Project Theia work.

The React front-end is responsible for all elements of the application that the
user interacts with. This includes the login page and the home page. The home
page in particular is built using two class definitions: LinkPair and Home. The
LinkPair class is responsible for gathering the URL, latitude, and longitude to
pass to the script, while the Home class is responsible for displaying a user’s
favorites and predetermined locations. The Home class also contains code for
axios get and post requests which are used to interact with the back-end to read
or write to a user’s favorites as well as trigger the Web Recorder Python script
to take a screenshot of a website from a location specified in latitude and
longitude coordinates by the user.
