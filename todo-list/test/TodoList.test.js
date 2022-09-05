const { assert } = require("chai");

const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  let todoList;
  before(async () => {
    todoList = await TodoList.deployed();
  });

  it("deployed successfully", async () => {
    const address = await todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, null);
    assert.notEqual(address, "");
    assert.notEqual(address, undefined);
  });

  it("lists tasks", async () => {
    const taskCount = await todoList.taskCount();
    const task = await todoList.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.content, "Have a nice day too");
    assert.equal(task.completed, false);
    assert.equal(taskCount, 2);
  });

  it("create tasks", async () => {
    const result = await todoList.createTask("A new Task");
    const taskCount = await todoList.taskCount();
    assert.equal(taskCount, 3);
    // console.log(result.logs[0].args);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 3);
    assert.equal(event.content, "A new Task");
    assert.equal(event.completed, false);
  });

  it("toggles task", async () => {
    const result = await todoList.toggleCompleted(1);
    // console.log(result);
    const event = result.logs[0].args;
    // console.log(event);
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.completed, true);
  });

  it("deletes item", async () => {
    const result = await todoList.deleteTask(1);
    const event = result.logs[0].args;
    console.log(event.id.toNumber());
    console.log(event.content);
    const taskCount = await todoList.taskCount();
    // console.log(taskCount.toNumber())

    // assert.equal(event.id.toNumber(), 1);
    // assert.equal(taskCount, 2);
  });
});
