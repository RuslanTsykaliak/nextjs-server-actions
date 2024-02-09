// actions.ts

'use server'

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prismadb";

export const AddTodo = async (formData: FormData) => {

  const title = formData.get("title");

  try {
    await prisma.todo.create({
      data: {
        title: title as string,
      }
    })
  } catch (e) {
    return {
      error: e,
    }
  }

  revalidatePath("/")
};


export const RemoveTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id: id,
      }
    })
  } catch (e) {
    return {
      error: e,
    }
  }

  revalidatePath("/")
};