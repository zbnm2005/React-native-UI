import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Header from './Header.js'
import Body from './Body.js'

export default class App extends React.Component {
  
  state ={
    todos: []
  }

  
  componentDidMount =() => {
    AsyncStorage.getItem("todos").then(data=>{
      const todos = JSON.parse(data || '[]');
      this.setState({todos});
    });
  };

  //삭제 함수 : id에 해당하는 할 일을 찾아서 삭제한다.

  removeTodo = (id) => {
    this.setState(prevState=>{
      const index = prevState.todos.findIndex(e =>e.id ===id);
      prevState.todos.splice(index,1);
      const todos = [
        ...prevState.todos
      ];
      AsyncStorage.setItem("todos", JSON.stringify(todos));
      
      return({todos})
    });
  }
  //체크 표시 함수
  checkTodo = (id) => {
    this.setState(prevState =>{
      const[todo] = prevState.todos.filter(e=>e.id ===id);
      todo.completed = !todo.completed;
      const todos=[
        ...prevState.todos
      ];
      AsyncStorage.setItem("todos", JSON.stringify(todos));
      return({todos})
    });
  }
  //할일 추가 함수
  addTodo= (todo) => {
    
    //새로운 할일(todo) 객체 생성
    const newTodo ={
      id:Date.now(), //등록시간
      text: todo,      //할일 내용 
      completed: false, //완료여부
    }

    // state 업데이트
    this.setState(prevState => {
      const  todos =  [
        newTodo, // 새로 추가된 할일(todo)
        ...prevState.todos //기존의 할일 목록
      ];
      AsyncStorage.setItem("todos", JSON.stringify(todos));
      return{todos}
    });
  

  //콘솔창에 출력
  console.log(this.state.todos);
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <Header addTodo={this.addTodo}/>
        <Body 
          todos={this.state.todos} 
          checkTodo={this.checkTodo}
          removeTodo={this.removeTodo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    backgroundColor: "#EEE",    
  },
  title: {
    fontWeight: "800",
    fontSize:30,
    marginLeft:20,
    marginBottom: 20,
  }
});
