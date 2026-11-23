import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Home() {
  return (
    <Stack gap={4} maxW="2xl" mx="auto" p={8}>
      <Heading as="h1" size="2xl">
        Next Fullstack
      </Heading>
      <Text>
        Next.js・Prisma・Postgres で作る CRUD
        アプリの学習用プロジェクトです。ここに一覧画面を作っていきます。
      </Text>
      <Link asChild colorPalette="blue">
        <NextLink href="/about">このアプリについて →</NextLink>
      </Link>
    </Stack>
  );
}
