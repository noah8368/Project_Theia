# Project Theia README
## Installation
### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Selenium Bindings](https://selenium-python.readthedocs.io/installation.html)
- [Selenium Chrome Driver](https://selenium-python.readthedocs.io/installation.html)
- [Validators](https://pypi.org/project/validators/)
The local machine's public IPv4 address needs to be whitelisted on the MongoDB Server in order to access preexisting users and add favorites.
### Usage
Execute the following commands to run the startup script.
```
chmod u+x setup.sh
./setup.sh
```
Then run the following commands to start the back-end and front-end servers.
```
./back-end.sh
./front-end.sh
```
