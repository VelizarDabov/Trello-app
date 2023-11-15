import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState{
board: Board;
getBoard: () => void;
setBoardStore: (board:Board) => void;
updateTodoInDB: (todo:Todo, columnId:TypedColumn) =>void;
searchString:string;
setSearchString:( searchString:string ) => void;
}
const databaseId:string = '6553578b401bf2a9b3ac';
const collectionId:string = '655357b336a9dfb79726';

export const useBoardStore = create<BoardState>((set) => ({
  board:{
    columns: new Map<TypedColumn, Column>(),
  },
  searchString:'',
  setSearchString:(searchString) => set({searchString}),
getBoard: async() => {
const board = await getTodosGroupedByColumn();
set({ board })
},
setBoardStore: (board) => set({ board}),
updateTodoInDB: async (todo, columnId) => {
await databases.updateDocument(
databaseId, collectionId, todo.$id,{
    title:todo.title,
    status:columnId
}
)
}
}))