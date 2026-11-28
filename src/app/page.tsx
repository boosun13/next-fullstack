import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { BookList } from "@/components/book-list";
import { getBooks } from "@/data/books";

// データ取得役：DAL から取得して、表示用のコンポーネントに渡す
async function Books() {
  const books = await getBooks();
  return <BookList books={books} />;
}

export default function Home() {
  return (
    <Stack gap={4} maxW="2xl" mx="auto" p={8}>
      <Heading as="h1" size="2xl">
        Next Fullstack
      </Heading>
      <Text>
        Next.js・Prisma・Postgres で作る CRUD アプリの学習用プロジェクトです。
      </Text>

      <Suspense fallback={<Text color="fg.muted">読み込み中…</Text>}>
        <Books />
      </Suspense>

      <Link asChild colorPalette="blue">
        <NextLink href="/about">このアプリについて →</NextLink>
      </Link>
    </Stack>
  );
}
