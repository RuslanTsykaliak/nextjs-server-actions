'use client'

import { Todo } from "@prisma/client"
import { useOptimistic, useRef } from "react";

import { AddTodo, RemoveTodo } from "../actions";
import Button from "./Button";

type FormTodo = {
  todos: Todo[],
}

export default function FormTodo({ todos }: FormTodo) {

  const ref = useRef<HTMLFormElement>(null);

  // stop refetching of the old data
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo: Todo) => {
    return [...state, newTodo]
  })

  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();

          addOptimisticTodo({
            id: "",
            title: formData.get('title') as string,
          })

          await AddTodo(formData);
        }}
        className="flex flex-col w-[300px] my-16">
        <input
          type="text"
          name="title"
          className="px-4 py-2 mb-3"
          placeholder="Write your todo..."
          required
        />
        {/* need to be client component for pending */}
        <Button />
      </form >
      <main className="flex flex-col items-center px-4">
        <div className="container mx-auto my-4 p-8 rounded-lg  text-black">
          <ul className="list-disc">
            {optimisticTodos.map((todo: Todo) => (
              <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold mr-4">{todo.title}</h2>
                  <button
                    onClick={() => RemoveTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

