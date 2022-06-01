require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  listTasksForRemove,
  confirm,
  showListChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Enter a description:");
        tasks.createTask(desc);
        break;

      case "2":
        tasks.fullList();
        break;

      case "3":
        tasks.listCompletedOrPending(true);
        break;

      case "4":
        tasks.listCompletedOrPending(false);
        break;

      case "5":
        const ids = await showListChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;

      case "6":
        const id = await listTasksForRemove(tasks.listArr);
        if (id !== "0") {
          const confirmation = await confirm("Are you sure?");
          if (confirmation) {
            tasks.removeTask(id);
            console.log("Task removed".green);
          }
        }
        break;
    }

    saveDB(tasks.listArr);

    await pause();
  } while (opt !== "0");
};

main();
