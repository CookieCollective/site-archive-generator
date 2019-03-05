const fs = require("fs-extra");
const path = require("path");
const pug = require("pug");

var argv = require("yargs")
  .usage("Usage: $0 <project-path>")
  .option("extension", {
    alias: "e",
    type: "boolean"
  })
  .option("input", {
    alias: "i",
    required: true
  })
  .option("output", {
    alias: "o",
    default: "output"
  })
  .help("h").argv;

const projectPath = argv.input;
if (!fs.existsSync(projectPath)) {
  throw new Error("Invalid path.");
}

fs.emptyDirSync(argv.output);

const pageDirectory = path.join(projectPath, "views");
const pageFilenames = fs.readdirSync(pageDirectory);
pageFilenames.forEach(pageFilename => {
  const basename = path.basename(pageFilename, path.extname(pageFilename));
  const inputPath = path.join(pageDirectory, pageFilename);
  const html = pug.renderFile(inputPath);
  let outputPath = path.join(argv.output, basename);
  if (argv.extension || basename === "index") {
    outputPath += ".html";
  }
  fs.writeFileSync(outputPath, html);
});

const publicDirectory = path.join(projectPath, "public");
fs.copySync(publicDirectory, argv.output);
