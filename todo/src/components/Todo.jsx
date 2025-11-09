import { Component } from "react";
import './Todo.css';

export class Todos extends Component {
    constructor() {
        super();
        this.state = { input: "", todosList: [], Editingindex: null }
    }
    // componentDidMount() {
    //     localStorage.getItem("todos")

    // }
    inputhandler(e) {
        this.setState({ input: e.target.value })
    }
    Submitbutton() {
        if (this.state.input.length > 0) {
            //     this.state.todos.push(this.state.input)
            //   this.setState({todos:this.state.todos})
            this.setState({ todosList: [...this.state.todosList, this.state.input], input: "" })
        } else {
            alert("Enter something to Add")
        }
    }
    componentDidMount() {
        const data = localStorage.getItem("Todo's")
        this.setState({ todosList: JSON.parse(data) })
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.todosList.length !== this.state.todosList.length) {
            localStorage.setItem("Todo's", JSON.stringify(this.state.todosList))
        }
        else if (prevState.Editingindex !== this.state.Editingindex) {
            localStorage.setItem("Todo's", JSON.stringify(this.state.todosList))
        }
    }
    handleDelete(index) {
        this.state.todosList.splice(index, 1)
        this.setState({ todosList: this.state.todosList })
        localStorage.setItem("Todo's", JSON.stringify(this.state.todosList))
        // this.setState({todosList:this.state.todosList.filter((value,index)=>indexi!==index)})
    }
    handleEdit(i) {
        console.log("edited", i)
        this.setState({ Editingindex: i, input: this.state.todosList[i] })
    }
    handleUpdate() {
        if (this.state.input.length > 0) {
            this.state.todosList.splice(this.state.Editingindex, 1, this.state.input)
            this.setState({ todosList: this.state.todosList, Editingindex: null, input: "" })
            localStorage.setItem("Todo's", JSON.stringify(this.state.todosList))
        } else {
            alert("enter some todos")
        }
    }
    render() {
        return <div>
            <div>
                <h2 id="header">Welcome to TODO's</h2>
                <div class="input_div">
                    <input type="text" id="input" placeholder="Enter Todo's" onChange={(e) => this.inputhandler(e)} value={this.state.input} />
                    <span style={{ paddingLeft: '10px' }}> {this.state.Editingindex === null ? <button onClick={() => this.Submitbutton()} id="button">Add</button> : <button onClick={() => this.handleUpdate()} id="button">update</button>}</span>
                    {/* <button onClick={()=>this.Submitbutton()}>Add</button> */}
                </div>
                <div class="tasks_div">
                    <table className="Table" cellSpacing='0px'cellPadding='10'>
                        <thead style={{width:'50px'}}>
                            <tr>
                                <th id="head">Action</th>
                                <th id="change">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todosList.map((item, index) =>
                                <tr key={index}>
                                    <td id="values">{item}</td>
                                    <td id="data">
                                        <button onClick={() => this.handleEdit(index)} id="change_button" >Edit</button>
                                        <span style={{paddingLeft:'8px'}}><button onClick={() => this.handleDelete(index)} id="change_button">Delete</button></span>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}