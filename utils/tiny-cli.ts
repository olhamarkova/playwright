const readline = require("node:readline");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function runTests(mode) {
  try {
    return await new Promise((resolve, reject) => {
      resolve(test(mode));
      reject(new Error("Rejected"));
    });
  } catch {
    throw new Error("Failed");
  }
}

async function test(mode) {
  const testMode = mode ? "test-open" : "test";
  const { stdout, stderr } = await exec(`npm run ${testMode}`);
  console.log(stdout);
  if (stderr) console.log(stderr);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Would you like to run tests in UI mode? (yes/no)> ",
});

rl.prompt();

rl.on("line", (line) => {
  const mode = line === "yes" ? true : false;
  console.log("Your tests are running...");
  runTests(mode).then(() => rl.close());
}).on("close", () => {
  console.log("Run completed");
  console.log("Happy development!");
  process.exit(0);
});
