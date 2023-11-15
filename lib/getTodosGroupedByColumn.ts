import { databases } from "@/appwrite"

const databaseId = '6553578b401bf2a9b3ac';
const collectionId = '655357b336a9dfb79726';
export const getTodosGroupedByColumn = async() => {
    const data = await databases.listDocuments(
        databaseId,
        collectionId
    )
  const todos = data.documents;
  console.log(todos)
const columns = todos.reduce((acc, todo) => {
    if(!acc.get(todo.status)){
        acc.set(todo.status, {
            id:todo.status,
            todos:[]
        })
    }
acc.get(todo.status)!.todos.push({
    $id:todo.$id,
    $createdAt: todo.$createdAt,
    title:todo.title,
    status:todo.status,
    ...(todo.image && {image: JSON.parse(todo.image)})
})
return acc
}, new Map<TypedColumn, Column>());
const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];

for(const columnType of columnTypes){
    if(!columns.get(columnType)){
        columns.set(columnType, {
            id:columnType,
            todos:[],
        })
    }
}
const sortedColumns = new Map(
    Array.from(columns.entries()).sort((a,b) =>
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
)
const board: Board={
    columns: sortedColumns
}
console.log(columns)
return board
}