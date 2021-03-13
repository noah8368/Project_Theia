#!/bin/bash

cp src/screenshots/default_screenshot.png src/screenshots/screenshot.png
pm2 start app.js --name "Project_Theia_Back_End"
pm2 start npm --name "Project_Theia_Front_End" -- start
