'use client'
import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index:number;
    id:TypedColumn;
    innerRef: (element:HTMLElement| null ) => void;
    draggbleProps:DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}
const TodoCard = ({todo, index, id, innerRef, draggbleProps, dragHandleProps,} : Props)=> {
 
 
  const deleteTask = useBoardStore((state) => state.deleteTask)
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if(todo.image){
      const fetchImage = async() => {
        const url = await getUrl(todo.image!);
        if(url){
          setImageUrl(url.toString());
        }
      }
      fetchImage()
    }

  },[todo])
 
  return (
    <div
    className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggbleProps} {...dragHandleProps} ref={innerRef}
    ><form onSubmit={() => deleteTask(index, todo, id)}>
       <div className='flex justify-between items-center p-5'>
            {todo.title}
            <button onClick={() => deleteTask(index, todo, id)}className='text-red-500 hover:text-red-600'>
                <XCircleIcon className='ml-5 h-8 w-8'/>
            </button>
        </div>
    </form>
       
         {imageUrl && ( 
          <div className='h-full w-full rounded-b-md'>
           <Image
           src={imageUrl}
           alt='Task image'
           width={200}
           height={200}
           className='w-full object-contain rounded-b-md'
           /> 
            </div>
         )}
    </div>
  )
}

export default TodoCard