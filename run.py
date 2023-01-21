import socketserver
import http.server
import sys
import argparse
from os import path
from wrappers.main import generate
import webbrowser
from os import path, getcwd
import json

argParser = argparse.ArgumentParser()
argParser.add_argument("-t", "--thinkingPages", type=int,
                       help="Number of pages to use in setting test cases, prototyping, thinking ...")
argParser.add_argument("-c", "--codingPages", type=int,
                       help="Number of pages to use in writing drafts or code")
argParser.add_argument("-f", "--fontSize", type=int,
                       help="The font size")
thinking_pages = 1
coding_pages = 1
font_size = 12
try:
    args = argParser.parse_args()
    thinking_pages = args.thinkingPages
    coding_pages = args.codingPages
    font_size = args.fontSize
except:
    print("Parameters are not correct")
    sys.exit()
# Scrapping codeforces and get json file name
FILES = 'files'
start_point = "problems.in"
start_file = path.join(FILES, start_point)
name = generate(start_file)

# saving the JSON name in files/json.in
cur_path = path.abspath(getcwd())
json_path = path.join(cur_path, path.join(
    "files", path.join("JsonFiles", name)))
json_save = path.join(cur_path, path.join("files", "json.in"))
with open(json_save, 'w') as f:
    tmp = {'data': name, 'thinking_pages': thinking_pages,
           'coding_pages': coding_pages, 'font_size': font_size}
    json.dump(tmp, f)


# Opining the html-css-js file
html_path = path.join(cur_path, path.join("drawers", "index.html"))
# webbrowser.open(html_path)
