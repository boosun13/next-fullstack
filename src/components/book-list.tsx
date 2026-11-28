import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import type { BookListItem } from "@/data/books";
import type { BookStatus } from "@/generated/prisma/client";

const statusLabel: Record<BookStatus, string> = {
  UNREAD: "未読",
  READING: "読書中",
  DONE: "読了",
};

export function BookList({ books }: { books: BookListItem[] }) {
  if (books.length === 0) {
    return <Text color="fg.muted">まだ本がありません。</Text>;
  }

  return (
    <Stack gap={3}>
      {books.map((book) => (
        <Stack key={book.id} gap={1} p={4} borderWidth={1} borderRadius="md">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">
              {book.title}
            </Text>
            <Badge>{statusLabel[book.status]}</Badge>
          </HStack>
          <Text color="fg.muted">{book.author}</Text>
          {book.rating !== null && <Text>評価：{book.rating} / 5</Text>}
        </Stack>
      ))}
    </Stack>
  );
}
