# Next.js フルスタック学習ロードマップ

ゴール：TypeScript ＋ Next.js（App Router）＋ Prisma ＋ Postgres で CRUD アプリを作り、Terraform で Vercel にデプロイする。

> このファイルは `docs/` に置いています。`create-next-app` は `docs/` だけがあるフォルダなら
> 「空のフォルダ」とみなすので、このフォルダでそのまま `npx create-next-app@latest .` を実行できます。

## 構成
| 層 | 技術 |
|---|---|
| フレームワーク | Next.js（App Router / Server Components / Server Actions） |
| 言語 | TypeScript |
| ORM | Prisma |
| DB | Neon（Postgres） |
| バリデーション | zod |
| ホスティング | Vercel |
| IaC | Terraform（`vercel/vercel` provider） |

---

## Step 0：環境準備
- [ ] mise でこのプロジェクトの Node を固定する（今は設定がないため、システムの v20.8.1 にフォールバックしている）
  - このフォルダで `mise use node@24` を実行 → `mise.toml` ができる
- [ ] `node -v` で 24.x になっていることを確認する
- [ ] Terraform も mise で入れる（`mise use terraform@latest`）→ `terraform -v`
- [ ] （任意）古い `C:\Program Files\nodejs` はアンインストールしてよい（mise の node と取り違える原因になる）
- [ ] Git をインストール済みか確認し、GitHub アカウントを用意する
- [ ] Vercel アカウントを作り、GitHub と連携する
- [ ] Neon アカウントを作る（DB は Step 2 で作るので、今はアカウントだけ）

**チェック**：`node -v` / `npm -v` / `terraform -v` / `git --version` がすべて表示される

## Step 1：Next.js の雛形を作って構造を理解する
- [ ] このフォルダで `npx create-next-app@latest .` を実行する
  - TypeScript：Yes / ESLint：Yes / App Router：Yes / `src/` ディレクトリ：お好み / Tailwind：お好み
- [ ] `git init` して最初のコミットをする
- [ ] `npm run dev` で http://localhost:3000 を開く
- [ ] `app/page.tsx` を書き換えて、画面に反映されることを確認する
- [ ] `app/about/page.tsx` を自分で作り、`/about` が表示されることを確認する（ファイルベースルーティング）

**自分で答えてみる**
1. `layout.tsx` と `page.tsx` の役割の違いは？
2. Server Component と Client Component の違いは？ `"use client"` はいつ必要？
3. `tsconfig.json` の `paths`（`@/*`）は何のためにある？

## Step 2：Prisma ＋ DB で一覧を表示する（非同期処理 その1）
- [ ] 題材を決め、エンティティを1〜2個設計する（例：Book / Memo）
- [ ] Neon でプロジェクトを作り、接続文字列を `.env` の `DATABASE_URL` に入れる
  - `.env` が `.gitignore` に含まれているか必ず確認する
- [ ] Prisma を導入する（`prisma` と `@prisma/client`、`npx prisma init`）
- [ ] `schema.prisma` にモデルを書き、`npx prisma migrate dev` を実行する
- [ ] Prisma Client のシングルトンを用意する（`lib/prisma.ts`）
  - ヒント：開発中のホットリロードで接続が増えすぎる問題を、`globalThis` で回避する
- [ ] `async` な Server Component で `findMany` を呼び、一覧を表示する
- [ ] `npx prisma studio` でデータを手で入れ、画面に出ることを確認する

**自分で答えてみる**
1. `findMany` の戻り値の型はどこから来ている？（エディタで型をホバーしてみる）
2. Server Component で直接 DB を呼んでも安全なのはなぜ？

## Step 3：Server Actions で CRUD
- [ ] 作成フォーム → Server Action（`"use server"`）で `create` する
- [ ] zod で入力をバリデーションし、エラーをフォームに返す（`useActionState`）
- [ ] 更新・削除を実装する
- [ ] 変更後に `revalidatePath` で一覧を更新する
- [ ] 送信中の表示を出す（`useFormStatus` など）

**自分で答えてみる**
1. Server Action と API Route（`app/api/.../route.ts`）は、それぞれいつ使う？
2. zod のスキーマから TypeScript の型を作るには？（`z.infer`）

## Step 4：非同期処理を深掘りする
- [ ] 2つのクエリを `await` で順番に実行する場合と、`Promise.all` で並列に実行する場合で、かかる時間を比べる（わざと遅延を入れて計測する）
- [ ] `loading.tsx` と `<Suspense>` で、遅い部分だけをストリーミング表示する
- [ ] `error.tsx` でエラー画面を作り、わざと例外を投げて確認する
- [ ] `notFound()` で、存在しない ID のとき 404 を返す
- [ ] Prisma の `$transaction` を使う処理を1つ入れる（例：作成と同時にログを記録する）
- [ ] `Promise.allSettled` と `Promise.all` の違いを、小さいコードで試す

**自分で答えてみる**
1. ウォーターフォール（直列の待ち）が起きる原因と、その避け方は？
2. `async` 関数の中で `try/catch` が拾える例外と、拾えない例外は？

## Step 5：Terraform で Vercel にデプロイ
- [ ] GitHub にリポジトリを作って push する
- [ ] Vercel の API Token を発行する（**コミットしない**。環境変数 `VERCEL_API_TOKEN` で渡す）
- [ ] `infra/` ディレクトリを作り、`vercel/vercel` provider を設定する
- [ ] `vercel_project`（GitHub リポジトリと連携）を定義する
- [ ] `vercel_project_environment_variable` で `DATABASE_URL` を設定する（`sensitive` な変数として渡す）
- [ ] `terraform init` → `plan` → `apply`
- [ ] ビルド時に `prisma generate` が走るようにする（`postinstall` か build スクリプトで）
- [ ] 本番 DB にマイグレーションを当てる方法を決める（`prisma migrate deploy`）
- [ ] push → 自動デプロイ → 本番 URL で動作確認する
- [ ] `*.tfstate` と `*.tfvars` を `.gitignore` に入れる

**自分で答えてみる**
1. tfstate には何が入っている？ なぜコミットしてはいけない？
2. Vercel の Preview 環境と Production 環境で DB を分けるには？

## 発展（余裕があれば）
- [ ] 認証（Auth.js）を入れて「自分のデータだけ」見えるようにする
- [ ] Vitest でバリデーションやロジックをテストする
- [ ] GitHub Actions で PR ごとに `terraform plan` と型チェックを実行する
- [ ] Prisma と Drizzle を比べてみる

---

## 進め方のルール
- 各 Step の「自分で答えてみる」に答えられたら次へ進む
- 詰まったら、エラーメッセージ全文と「何をしたら何が起きたか」をメモして質問する
- Step ごとにコミットする（例：`step1: scaffold`）
