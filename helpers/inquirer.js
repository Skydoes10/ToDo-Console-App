require("colors");
const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Remove task`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("   Select an option".white);
  console.log("======================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt({
    type: "input",
    name: "pause",
    message: `Press ${"ENTER".green} to continue\n`,
  });
};

const readInput = async (message) => {
  const { desc } = await inquirer.prompt({
    type: "input",
    name: "desc",
    message,
    validate: (value) => {
      if (value.length === 0) {
        return "Please enter a description";
      }
      return true;
    },
  });
  return desc;
};

const listTasksForRemove = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1 + "."}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancel",
  });

  const { id } = await inquirer.prompt({
    type: "list",
    name: "id",
    message: "Remove a task",
    choices,
  });

  return id;
};

const confirm = async (message) => {
  const { ok } = await inquirer.prompt({
    type: "confirm",
    name: "ok",
    message,
  });
  return ok;
};

const showListChecklist = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1 + "."}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completedAt ? true : false,
    };
  });

  const { ids } = await inquirer.prompt({
    type: "checkbox",
    name: "ids",
    message: "Select tasks to complete",
    choices,
  });

  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksForRemove,
  confirm,
  showListChecklist,
};
