import argparse
from datetime import datetime
import os
from selenium import webdriver
import socket
import re
import time
from urllib.parse import urlparse

class WebRecorder:
    def __init__(self, args):
        self.driver = webdriver.Firefox()
        self.url = args.url
        self.timing_load = args.load_time
        self.showing_ip = args.IP_address
        self.loc = args.location
        default_path = os.path.join(os.getcwd(), "screenshots")
        self.path = args.file_path if (args.file_path) else default_path
    def takeScreenshot(self):
        print("Loading", self.url + "...")
        start_load_time = time.time()
        self.driver.get(self.url)
        end_load_time = time.time()
        pause_time = 1
        time.sleep(pause_time)

        now = datetime.now()
        date_str = now.strftime("%Y-%m-%d_%H:%M:%S")
        hostname = urlparse(self.url).hostname
        file_name = hostname+'_'+date_str+".png"
        file_name = os.path.join(self.path, file_name)

        self.driver.get_screenshot_as_file(file_name)
        self.driver.quit()

        print("Visited from", self.loc)
        print("Saved view to", file_name)

        if self.timing_load:
            exec_time = round(end_load_time - start_load_time, 2)
            print("Load time:", str(exec_time) + 's')

        if self.showing_ip:
            ip = socket.gethostbyname(hostname)
            print("IP Address:", ip)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="URL of site to be visited")
    parser.add_argument("location", help="physical location to visit URL from")
    parser.add_argument("-f", "--file-path",
                        help="Save screenshot of given site to a specified path")
    parser.add_argument("-t", "--load-time",
                        help="Output time to load page",
                        action="store_true")
    parser.add_argument("-i", "--IP-address",
                        help="Output IP address of the entered site",
                        action="store_true")
    args = parser.parse_args()

    site_manager = WebRecorder(args)
    site_manager.takeScreenshot()
