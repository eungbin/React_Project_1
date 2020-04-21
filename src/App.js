import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import axios from 'axios';
import "../node_modules/video-react/dist/video-react.css";
import { Player, PosterImage } from 'video-react';

class App extends Component {
  id = 3

  state = {
    input: '',
    host: '',
    todos: [
      { id: 0, text: ' 리액트 소개', checked: false }
    ]
  }

  componentDidMount() {
    this._getHost();
  }

  _getHost = async () => {
    const res = await axios.get('/api/host');
    console.log(res);
    this.setState({ host: res.data.host })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
    axios.post('/api/add', 'test')
      .then(response => {
        console.log(response)
      });
  }

  handleKeyPress = (e) => {
    if (e.Key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 개체

    const nextTodos = [...todos]; //배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
        <h3>Welcome to <u> {this.state.host} </u></h3>
        <Player
          playsInline
          poster="/assets/poster.png"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        />
      </TodoListTemplate>
    );
  }
}

export default App;
