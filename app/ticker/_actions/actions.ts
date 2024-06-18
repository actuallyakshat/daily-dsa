"use server";

import prisma from "@/db";

export async function updateQuestionsSolved(userId: string, value: number) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      return { success: false, message: "User does not exists" };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        questionsSolved: value,
      },
    });
    return { success: true, message: "Questions solved updated" };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
