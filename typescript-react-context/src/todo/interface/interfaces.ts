//!Asi va a lucir la propiedad todo

export interface Todo {
    id: string;
    desc: string;
    completed:boolean;
}

//!Esta es la firma o la apariencia que va a tener el state
export interface TodoState{
    todoCount:number,
    todos: Todo[], //*la propiedad todo sera del tipo Todo definido como inteface
    completed:number;
    pending:number;

}
