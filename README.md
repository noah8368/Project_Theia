# Project Theia Back-End README
This is the server-side implementation of Project Theia: a Node.js server that
interfaces with our MongoDB instance and our React front-end to facilitate the
storage and modification or user information. In particular, this server
provides a login system and a place to store favorite websites for every user.

To get started, open up your command line, navigate to the server directory,
and type:
```
node app.js
```
# Web Recorder

##### Noah Himed
##### 5 March 2021

This repository's primary file `web_recorder.py` defines a routine that visits
a website with a spoofed location, and takes a screenshot of the site. The
resulting output allows a user to view what a website may look like in another
country. An additional script `test.sh` is defined with some example inputs.

### Usage

`web_recorder.py` is ran in the following way from a POSIX shell:

    python3 web_recorder.py [-h] [-f FILE_PATH] [-t] [-i] url latitude longitude

Here, the `-f` flag gives the user the option to enter a file path to save the
screenshot of the requested website to. If no path is given, the default path
is `./screenshots`. Please note that **if a path is given, it is not checked**
for validity before a screenshot is attempted to be saved. The `-t` flag causes
the program to output how long it took for the given page to load, and the `-i`
flag gives the IP address of the given site from the requested location.

`Latitude` and `longitude` must both be formatted as floating point numbers, with
Latitude on the range [-90, 90] and longitude on the range [-180, 180]. The
`url` parameter must be a complete hyperlink with either "http" or "https" pre-
pended in addition to "www" before the main hostname. All of these arguments
are checked for validity, and an exception will be thrown if any are found to
be incorectly formatted.

### Implementation

The class `WebRecorder` (defined and implemented in `web_recorder.py`) primarily
uses the Selenium library to run a headless instance of Google Chrome to visit
a given URL. The following commands

      driver.execute_cdp_cmd(
            "Emulation.setGeolocationOverride",
            {
                "latitude": self.lat,
                "longitude": self.long,
                "accuracy": 100,
            },
        )
        driver.execute_cdp_cmd(
            "Browser.grantPermissions",
            {
                "permissions": ["geolocation"]
            },
        )

instructs Chrome to allow geolocation and to use the location given by the user.

Parameters are collected using the ArgParse library, and are checked for
validity (if the given location and URL are valid) in the constructor. A
`ValueError` is thrown if either the URL or coordinates entered are invalid,
with an accompanying error message.
