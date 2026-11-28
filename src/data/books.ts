import "server-only";
import { prisma } from "@/lib/prisma";

// 一覧表示に必要な列だけを返す（DTO）
export async function getBooks() {
  return prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      status: true,
      rating: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export type BookListItem = Awaited<ReturnType<typeof getBooks>>[number];
