pragma solidity >= 0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event ToggleTask(
        uint id,
        bool completed
    );

    event TaskDeleted(
        uint id,
        string content
    );

    constructor() public {
        createTask("Have a nice day");
        createTask("Have a nice day too");
    }

    // function getTaskCount() public view returns(uint) {
    //     return taskCount;
    // }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit ToggleTask(_id, _task.completed);

    }

    function deleteTask(uint _id) public {
        require(_id <= taskCount);
        Task memory _task1 = tasks[taskCount]; 
        uint newId = _id + 1;
        delete tasks[newId];
        tasks[newId] = Task(newId, _task1.content, _task1.completed);
        taskCount --;
        emit TaskDeleted(_task1.id, _task1.content);
    }
}