import React, { Component } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import "./App.css";
import TodoList from "../abis/TodoList.json";
import Navbar from "./Navbar.js";
import Main from "./Main";

class App extends Component {
  // --- to make API calls once the component is initiated and configure the values into the state -----
  async componentWillMount() {
    await this.loadWeb3();
    // console.log(window.web3);
    await this.loadBlockchainData();
  }

  // ---- first step is to load web3 - METAMASK -------
  // follow metamask article for this.
  async loadWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  // --------- load blockchain and smart contract info
  async loadBlockchainData() {
    // get web3
    const web3 = window.web3;
    // load account
    const accounts = await web3.eth.getAccounts();
    // get the actual account address
    // console.log(accounts[0]);
    this.setState({ account: accounts[0] });
    // get network data so it can connect to it automatically, --- automatically reract network on which contract is deployed
    const networkId = await web3.eth.net.getId();
    const networkData = TodoList.networks[networkId];

    if (networkData) {
      const todolist = web3.eth.Contract(TodoList.abi, networkData.address);
      // console.log(todolist);
      this.setState({ todolist });

      // get task count
      // prettier-ignore
      let taskCount = await todolist.methods.taskCount().call();
      taskCount = taskCount.toNumber();
      // console.log(taskCount);
      this.setState({ taskCount });
      for (var i = 1; i <= taskCount; i++) {
        const task = await todolist.methods.tasks(i).call();
        this.setState({ tasks: [...this.state.tasks, task] });
      }
      this.setState({ loading: false });
    } else {
      window.alert("contract is not deployed to the detected network");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      taskCount: 0,
      tasks: [],
      loading: true,
    };

    this.markTodo = this.markTodo.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  markTodo(index) {
    // contract
    this.setState({ loading: true });
    console.log(this.state.tasks);
    this.state.todolist.methods
      .toggleCompleted(index)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        // this.window.location.reload();
        this.setState({ loading: false });
      });

    // only react
    // this.setState({ loading: true });
    // const newTodos = [...this.state.tasks];
    // newTodos[index].completed = true;
    // this.setState({ tasks: newTodos });
    // this.setState({ loading: false });
  }

  removeTodo = (index) => {
    // contract
    this.setState({ loading: true });
    this.state.todolist.methods
      .deleteTask(index)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });

    // window.location.reload();
    // using react
    // const newTodos = [...this.state.tasks];
    // newTodos.splice(index, 1);
    // this.setState({ tasks: newTodos });
  };

  createTask(content) {
    this.setState({ loading: true });
    this.state.todolist.methods
      .createTask(content)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} counter={this.state.taskCount} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <Main
                  createTask={this.createTask}
                  tasks={this.state.tasks}
                  mark={this.markTodo}
                  remove={this.removeTodo}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
