import prisma from "@/lib/prismadb";
import FormTodo from "./components/FormTodo";

export default async function Home() {
  const todos = await prisma.todo.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center w-full p-24">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <FormTodo todos={todos} />
    </main>
  );
}
