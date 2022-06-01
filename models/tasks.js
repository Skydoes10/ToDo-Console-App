const Task = require("./task");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    for (const id in this._list) {
      list.push(this._list[id]);
    }

    return list;
  }

  construnctor() {
    this._list = {};
  }

  loadTasksFromArray(tasks) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc) {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  fullList() {
    console.log();
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}`;
      const { desc, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;
      console.log(`${(idx + ".").green} ${desc} :: ${status}`);
    });
  }

  listCompletedOrPending(completed) {
    console.log();
    let index = 0;
    this.listArr.forEach((task) => {
      const { desc, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;

      if (completed) {
        if (completedAt) {
          index += 1;
          console.log(`${(index + ".").green} ${desc} :: ${completedAt.green}`);
        }
      } else {
        if (!completedAt) {
          index += 1;
          console.log(`${(index + ".").green} ${desc} :: ${status}`);
        }
      }
    });
  }

  removeTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleCompleted(ids) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
