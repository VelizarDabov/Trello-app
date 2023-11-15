'use client'
import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index:number;
    id:TypedColumn;
    innerRef: (element:HTMLElement| null ) => void;
    draggbleProps:DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}
const TodoCard = ({todo, index, id, innerRef, draggbleProps, dragHandleProps} : Props) => {
  return (
    <div
    className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggbleProps} {...dragHandleProps} ref={innerRef}
    >
        <div className='flex justify-between items-center p-5'>
            {todo.title}
            <button className='text-red-500 hover:text-red-600'>
                <XCircleIcon className='ml-5 h-8 w-8'/>
            </button>
        </div>
        
    </div>
  )
}

export default TodoCard