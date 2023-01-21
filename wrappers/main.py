from wrappers.codeforces_wrapper import parse_problem
from os import path
from datetime import datetime
import json

FILES = 'files'


def find_in_list(listy, item):
    for x in listy:
        if item == x:
            return True
    return False


def read(start_point_path):
    problems = []
    filepath = start_point_path
    with open(filepath) as f:
        while f.readable():
            problem_link = f.readline()
            if not problem_link:
                break

            if find_in_list(problems, problem_link) == False:
                problems.append(problem_link)
    return problems


def get_json(problem_links):
    print("Unique problems are " + str(len(problem_links)) + " problem")
    data = []
    for problem_link in problem_links:
        if problem_link != '':
            problem = parse_problem(problem_link=problem_link)
            data.append(problem)
    return data


def write(data, filename):
    filepath = path.join(FILES, path.join('JsonFiles', filename))
    problems = {'data': data}
    with open(filepath, 'w') as f:
        json.dump(problems, f)


def get_date_time():
    now = datetime.now()
    date_time = now.strftime("%d%m%Y%H%M%S") + '.json'
    return date_time


def generate(start_point_path):
    problem_links = read(start_point_path)
    data = get_json(problem_links)
    name = get_date_time()
    write(data, name)
    return name
