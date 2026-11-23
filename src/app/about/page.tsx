import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Stack gap={4} maxW="2xl" mx="auto" p={8}>
      <Heading as="h1" size="2xl">
        About
      </Heading>
      <Text>
        Next.js（App Router）・Prisma・Postgres で CRUD
        アプリを作りながら、フルスタック開発を学ぶためのプロジェクトです。
      </Text>
      <Text>
        このページは src/app/about/page.tsx
        に置いてあり、ファイルの場所がそのまま /about という URL になります。
      </Text>
      <Link asChild colorPalette="blue">
        <NextLink href="/">← トップへ戻る</NextLink>
      </Link>
    </Stack>
  );
}
