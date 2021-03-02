import argparse
from datetime import datetime
from pathlib import Path
import os
from selenium.webdriver import Chrome, ChromeOptions
import validators
import socket
import re
import time
from urllib.parse import urlparse

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class WebRecorder:
    def __init__(self, args):
        if (validators.url(args.url)):
            self.url = args.url
        else:
            raise ValueError("Given url \""+args.url+"\" is invalid")

        self.timing_load = args.load_time
        self.showing_ip = args.IP_address
        self.loc = args.location

        default_path = os.fspath(Path.cwd().parent / "screenshots")
        self.path = args.file_path if (args.file_path) else default_path

        self.lat = 52.520007
        self.long = 13.404954
        self.acc = 100
    def takeScreenshot(self):
        hostname = urlparse(self.url).hostname
        now = datetime.now()
        date_str = now.strftime("%Y-%m-%d_%H:%M:%S")
        img_dir = Path(self.path)
        img_file = hostname+'_'+date_str+".png"
        img_path = os.fspath(img_dir / img_file)

        print("Loading", self.url + "...")
        driver = Chrome()
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
        start_load_time = time.time()
        driver.get(self.url)
        end_load_time = time.time()
        driver.refresh()
        time.sleep(3)
        driver.get_screenshot_as_file(img_path)
        driver.quit()

        print("Visited from", self.loc)
        print("Saved view to", img_path)

        if self.timing_load:
            exec_time = round(end_load_time - start_load_time, 2)
            print("Load time:", str(exec_time) + 's')

        if self.showing_ip:
            ip = socket.gethostbyname(hostname)
            print("IP Address:", ip)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="URL of site to be visited")
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
