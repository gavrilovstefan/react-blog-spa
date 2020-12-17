const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");

const JSON_PATH = path.resolve(__dirname, "../data");

const readJsonFile = async (jsonFilename) =>
  fs
    .readFile(`${JSON_PATH}/${jsonFilename}`)
    .then((res) => JSON.parse(res.toString()));

const saveJsonFile = async (jsonFilename, data) =>
  fs.writeFile(`${JSON_PATH}/${jsonFilename}`, JSON.stringify(data, null, 2));

const seedData = async () => {
  const seedJSONPath = path.resolve(__dirname, "../data");
  const origJSONPath = path.resolve(__dirname, "./data");
  if (existsSync(seedJSONPath + "/articles.json")) {
    console.log("The path exists.");
  } else {
    await fs.copyFile(
      origJSONPath + "/articles.json",
      seedJSONPath + "/articles.json"
    );
    await fs.copyFile(
      origJSONPath + "/authors.json",
      seedJSONPath + "/authors.json"
    );
    await fs.copyFile(
      origJSONPath + "/comments.json",
      seedJSONPath + "/comments.json"
    );
    await fs.copyFile(origJSONPath + "/tags.json", seedJSONPath + "/tags.json");
    console.log("the path doesnt exist");
  }
  console.log(seedJSONPath);
};

const changeDate = date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.substr(0, 4);
  let month = date.substr(5, 2);
  const day = date.substr(8, 2);
  month = monthNames[month - 1];
  date = day + " " + month + " " + year;

  return date;
}

const pagination = (arr, page, limit) => {

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  result.arr = arr.slice(startIndex, endIndex);

  result.pages = new Array(Math.ceil(arr.length / limit)).fill({});
  const currentPage = {disabled: "disabled"}
  result.pages[page - 1] = currentPage

  result.next = endIndex < arr.length ? "" : "disabled",
  result.previous = startIndex > 0 ? "" : "disabled",
  result.page = page
  result.limit = limit

  return result
}

module.exports = {
  readJsonFile,
  saveJsonFile,
  seedData,
  changeDate,
  pagination
};
