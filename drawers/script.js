let thinking_pages = 1;
let coding_pages = 1;
let font_size = 1;
let regions = {
	title: "#problem-name",
	timeLimit: "#timeLimit > .value",
	memoryLimit: "#memoryLimit > .value",
	statement: "#statement",
	inputSpecification: "#inputSpecification",
	outputSpecification: "#outputSpecification",
	samples: "#samples",
	note: "#notes",
	link: "#problem-link",
};
let problem_counter = 0;
const fetch_json = async (url) => {
	let response = await fetch(url);
	let json = await response.json();
	console.log(json);
	return json;
};

function draw_from_json(url) {
	fetch_json(url).then((json) => {
		draw_all_problems(json["data"]);
	});
}
function remove_begin_lines(str) {
	idx = 0;
	while (idx < str.length && str[idx] == "\n") {
		idx++;
	}
	return str.substring(idx, str.length);
}
function draw_examples(examples) {
	let ret = document.createElement("div");
	let basic = document.querySelector("#input-output").cloneNode(true);

	examples.forEach((example) => {
		let new_node = basic.cloneNode(true);

		new_node.querySelector("#bot-part-input").innerHTML = remove_begin_lines(
			example["input"]
		);
		new_node.querySelector("#bot-part-output").innerHTML = remove_begin_lines(
			example["output"]
		);
		new_node.classList.remove("structure");
		ret.appendChild(new_node);
	});

	return ret.innerHTML;
}
function draw_statment(problem) {
	let basic = document.querySelector(".basic-page").cloneNode(true);

	for (x in regions) {
		let element = basic.querySelector(regions[x]);
		if (x == "samples") {
			element.innerHTML = draw_examples(problem[x]);
			continue;
		}
		element.innerHTML = problem[x];
	}
	let element = basic.querySelector("#title");
	element.innerHTML = problem["title"];
	basic.classList.remove("structure");
	basic.id = "problem-" + problem_counter;
	let file = document.getElementsByTagName("body")[0];
	file.appendChild(basic);
}
function insert_lines(basic, numoflines) {
	let line = document.querySelector(".line").cloneNode(true);
	line.classList.remove("structure");
	let all = 270;

	let h = all / numoflines;
	line.style.height = `${h}mm`;
	let cnt = 0;
	while (cnt < numoflines) {
		cnt++;
		basic.appendChild(line.cloneNode(true));
	}
	basic.classList.remove("structure");
	return basic;
}
function draw_thinking_page(header, pages, word, numoflines) {
	let ret = document.createElement("div");
	while (pages--) {
		let basic = document.querySelector(".think-page").cloneNode(true);
		basic.appendChild(header.cloneNode(true));
		wor = document.querySelector("#input-word").cloneNode(true);
		wor.textContent = word;
		basic.appendChild(wor);
		ret.appendChild(insert_lines(basic, numoflines));
	}
	let file = document.getElementsByTagName("body")[0];
	file.appendChild(ret);
}
function draw_coding_page(header, pages, word, numoflines) {
	let ret = document.createElement("div");
	while (pages--) {
		let basic = document.createElement("div");
		basic.classList.add("page");
		let basic2 = document.querySelector(".code-page").cloneNode(true);
		basic.appendChild(header.cloneNode(true));
		wor = document.querySelector("#input-word").cloneNode(true);
		wor.textContent = word;
		basic.appendChild(wor);
		basic2.querySelector(".left-section").innerHTML = insert_lines(
			basic2.querySelector(".left-section").cloneNode(true),
			numoflines
		).innerHTML;
		basic2.querySelector(".right-section").innerHTML = insert_lines(
			basic2.querySelector(".right-section").cloneNode(true),
			numoflines
		).innerHTML;

		basic2.classList.remove("structure");
		basic.appendChild(basic2);
		ret.appendChild(basic);
	}
	let file = document.getElementsByTagName("body")[0];
	file.appendChild(ret);
}
function draw_problem(problem, think_pages, coding_pages) {
	draw_statment(problem);
	let header = document.querySelectorAll(
		`#${"problem-" + problem_counter} > .page-header`
	)[0];
	draw_thinking_page(header, think_pages, "Thinking section:", 35);
	draw_coding_page(header, coding_pages, "Coding Area:", 50);
	problem_counter++;
}
function draw_all_problems(allproblems) {
	allproblems.forEach((problem) => {
		draw_problem(problem, thinking_pages, coding_pages);
	});
}
const get_json_metadata = async () => {
	return fetch_json("../files/json.in").then((json) => {
		url = "../files/JsonFiles/" + json["data"];
		thinking_pages = json["thinking_pages"] ?? 1;
		coding_pages = json["coding_pages"] ?? 1;
		font_size = json["font_size"] ?? 12;
		console.log(json);

		return url;
	});
};
get_json_metadata().then((url) => {
	draw_from_json(url);
	console.log("gg");
});
