# UI Features



In the project directory, you can run:

### `rm -rf node_modules`

### `rm package-lock.json`

### `npm install`

### `npm start`

to launch the application. 

The LinkPair component, defined at the beginning of Home.js will serve as the point of
contact with the back end. In state, link, longitude, and laditude values are stored.
The `render()` function in this component will involve a call to the backend, load the
image in screenshot (screenshot.png), and render the image. This png file is in the pages
directory, and imported at the top of Home.js.

A LinkPair component is conditionally rendered when the form is submitted in the `render()`
function of the Home component. The inputted longitude, laditude, and link are passed as
props to the LinkPair.

The Home component involves everything on the screen. State stores longitude, laditude, 
link, username, a list of favorites, and a boolean value, showImage, for conditional rendering
of the image. These values are updated according to user input/ineraction, aside from 
username which is never changed.

Once backend is connected, the fullscreen and download buttons will need to have updated
`OnClick()` functions for expected functionalties. 
