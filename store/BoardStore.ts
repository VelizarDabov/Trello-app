import { ID, databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'

interface BoardState{
board: Board;
getBoard: () => void;
setBoardStore: (board:Board) => void;
updateTodoInDB: (todo:Todo, columnId:TypedColumn) =>void;
searchString:string;
newTaskInput:string;
newTaskType:TypedColumn;
image:File | null;
setSearchString:( searchString:string ) => void;
addTask: (todo:string, columnId:TypedColumn, image?:File | null) => void;
deleteTask: (taskIndex:number, todoId: Todo, id:TypedColumn) =>void; 
setNewTaskType:(columnId:TypedColumn) => void;
setNewTaskInput: (input:string) => void;
setImage:(image: File | null) => void;
}
const databaseId:string = '6553578b401bf2a9b3ac';
const collectionId:string = '655357b336a9dfb79726';

export const useBoardStore = create<BoardState>((set, get) => ({
  
  board:{
    columns: new Map<TypedColumn, Column>(),
  },
  searchString:'',
  newTaskInput: '',
  newTaskType:'todo',
  image: null,
  setSearchString:(searchString) => set({searchString}),
getBoard: async() => {
const board = await getTodosGroupedByColumn();
set({ board })
},
setBoardStore: (board) => set({ board}),

deleteTask: async(taskIndex:number, todo: Todo, id:TypedColumn)=>{
  const newColumns = new Map(get().board.columns);
  newColumns.get(id)?.todos.splice(taskIndex, 1);
  set({board: { columns: newColumns} });

  if(todo.image){
    await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
  }
  await databases.deleteDocument(
    databaseId, collectionId, todo.$id,
  )
},
setNewTaskInput: (input:string) => set({newTaskInput : input}),
setNewTaskType:(columnId:TypedColumn) => set({newTaskType: columnId}),
setImage:(image: File | null) => set({image}),

updateTodoInDB: async (todo, columnId) => {
await databases.updateDocument(
databaseId, collectionId, todo.$id,{
    title:todo.title,
    status:columnId
}
)
},
addTask: async (todo:string, columnId:TypedColumn, image?:File | null) =>{
  let file: Image | undefined;
  if(image) {
    const fileUploaded = await uploadImage(image);
    if(fileUploaded){
      file={
        bucketId: fileUploaded.bucketId,
        fileId:fileUploaded.$id,
      }
    }
  }
 const {$id} = await databases.createDocument(
    databaseId, collectionId, ID.unique(), {
      title:todo,
      status:columnId,
      ...(file && {image:JSON.stringify(file)})
    }
  )
  set({newTaskInput: ''});
  set((state) => {
    const newColumns = new Map(state.board.columns);
    const newTodo: Todo = {
      $id,
      $createdAt: new Date().toISOString(),
      title:todo,
      status:columnId,
      ...(file && {image:file}),
    }
    const column = newColumns.get(columnId);


    if(!column){
      newColumns.set(columnId, {
        id: columnId,
        todos:[newTodo],
      })
    }else{
      newColumns.get(columnId)?.todos.push(newTodo)
    }
    return {board:{
      columns:newColumns,
    }}
  })
}
}))