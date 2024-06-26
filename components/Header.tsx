"use client";
import Image from "next/image";
import todoImage from '@/todo.png'
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import {  useState } from "react";
export const Header = () => {
const [searchString, setSearchString] = useBoardStore((state) => [
  state.searchString, 
  state.setSearchString,
])
const [todosLength, setTodosLength] = useState(0);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-200 to-[#377e95] roubded-md filter blur-3xl opacity-50 -z-50"/>
        <Image
          src={todoImage}
          alt="trello-app"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex item-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder="Search"
              className="flex-1 outline-none"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Velizar Dabov" round size="50" color="#0055D1" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic text-[#0055D1] ">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1"/>
          {`Summarising your task for the day..  name="Velizar Dabov`}
        </p>
      </div>
    </header>
  );
};
export default Header;
