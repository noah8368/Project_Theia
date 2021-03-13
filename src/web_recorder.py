# Noah Himed
# 5 March 2021
# Define a class to load and screenshot a website with a spoofed geolocation

import argparse
from datetime import datetime
import os
from pathlib import Path
from selenium.webdriver import Chrome, ChromeOptions
import socket
import time
from urllib.parse import urlparse
import validators

# Raise an exception if given lattitude-longitude pair is invalid
def validate_loc(lat, long):
    lat_correct = -90 <= lat <= 90
    long_correct = -180 <= long <= 180
    if not (lat_correct and long_correct):
        raise ValueError("Given location ("+ str(lat) +", "+ str(long) +") is invalid")


class WebRecorder:
    def __init__(self, args):
        # Raise an exception if the given URL is invalid
        if not (validators.url(args.url)):
            raise ValueError("Given url \""+args.url+"\" is invalid")
        self.url = args.url

        self.timing_load = args.load_time
        self.showing_ip = args.IP_address

        # Set the file path to save the screenshot
        default_path = os.fspath(Path.cwd() / "src/screenshots")
        self.path = args.file_path if (args.file_path) else default_path
        if not(os.path.exists(self.path)):
            raise ValueError("Local screenshot path given is invalid: " + self.path)

        validate_loc(args.latitude, args.longitude)
        self.lat = args.latitude
        self.long = args.longitude
        self.acc = 100
    def takeScreenshot(self):
        # Set Chrome browser parameters and location
        chromeOpt = ChromeOptions()
        chromeOpt.add_argument("--headless")
        driver = Chrome(options=chromeOpt)
        driver.maximize_window()
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

        # Load browser page
        print("Loading", self.url + "...")
        start_load_time = time.time()
        driver.get(self.url)
        end_load_time = time.time()
        driver.refresh()
        time.sleep(3)

        # Save screenshot
        img_dir = Path(self.path)
        img_path = os.fspath(img_dir / "screenshot.png")
        driver.get_screenshot_as_file(img_path)
        driver.quit()

        print("Location: ("+str(self.lat)+", "+str(self.long)+')')
        print("Saved view to", img_path)

        # Print out optional output if -t or -i flags are given
        if self.timing_load:
            exec_time = round(end_load_time - start_load_time, 2)
            print("Load time:", str(exec_time) + 's')
        if self.showing_ip:
            hostname = urlparse(self.url).hostname
            ip = socket.gethostbyname(hostname)
            print("IP Address:", ip)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="URL of site to be visited")
    parser.add_argument("latitude", help="latitude of spoofed location",
                        type=float)
    parser.add_argument("longitude", help="longitude of spoofed location",
                        type=float)
    parser.add_argument("-f", "--file-path",
                        help="Save screenshot of given site to a specified path")
    parser.add_argument("-t", "--load-time",
                        help="Output time to load page",
                        action="store_true")
    parser.add_argument("-i", "--IP-address",
                        help="Output IP address of the entered site",
                        action="store_true")
    args = parser.parse_args()

    try:
        site_manager = WebRecorder(args)
        site_manager.takeScreenshot()
    except ValueError as e:
        error_msg = e.args[0]
        print("Error:", str(error_msg))
