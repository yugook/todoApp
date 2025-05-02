# MyTodoApp

## 概要
このプロジェクトは、React、TypeScript、Vite を用いて構築した Todo リストアプリケーションです。AWS Amplify を利用してユーザー認証や GraphQL API 経由でのデータ操作を行い、Tailwind CSS によるスタイリッシュな UI を提供します。

## 使用技術
- **React**: UI コンポーネントの構築
- **TypeScript**: 型安全な JavaScript 開発
- **Vite**: 高速な開発サーバーとビルドツール
- **AWS Amplify**: 認証および GraphQL API 統合
- **Tailwind CSS**: モダンなデザイン実装
- **ESLint**: コード品質の維持

## インストール方法
1. リポジトリをクローンする：
    ```sh
    git clone <repository_url>
    ```
2. `my-todo-app` ディレクトリに移動して依存関係をインストールする：
    ```sh
    cd my-todo-app
    npm install
    ```

## 開発サーバーの起動
以下のコマンドでローカルサーバーを起動し、[http://localhost:3000](http://localhost:3000) にアクセスしてください：
```sh
npm run dev
```

## ビルド方法
本番環境向けにプロジェクトをビルドするには、以下のコマンドを実行します：
```sh
npm run build
```

## プロジェクト構成
<details>
  <summary>プロジェクト構成</summary>
  
  ```
  package.json
  README.md
  
  .vscode/
    └─ settings.json
  
  my-todo-app/
    ├─ .eslintignore
    ├─ .gitignore
    ├─ .graphqlconfig.yml
    ├─ amplifyPublishIgnore.json
    ├─ eslint.config.js
    ├─ index.html
    ├─ package.json
    ├─ README.md
    ├─ tailwind.config.js
    ├─ tsconfig.app.json
    ├─ tsconfig.json
    ├─ tsconfig.node.json
    ├─ vite.config.ts
    ├─ .vscode/
    │    └─ settings.json
    ├─ amplify/
    │    ├─ cli.json
    │    ├─ README.md
    │    ├─ team-provider-info.json
    │    ├─ .config/
    │    ├─ backend/
    │    └─ hooks/
    ├─ build/
    ├─ public/
    └─ src/
         ├─ App.tsx
         ├─ App.css
         ├─ index.css
         ├─ main.tsx
         └─ ...
  ```
</details>

## 使用方法

### Todo の追加
上部の入力フォームに Todo 名と説明を入力し、"Add Task" ボタン（<FaPlus /> アイコン付き）をクリックすると、新しい Todo が追加されます。

### Todo の表示・更新
- "Refresh Todos" ボタンをクリックして最新の Todo リストを取得します。
- 各 Todo アイテムには、ステータス切替と削除のボタンがあり、ボタン操作で Todo の完了状態更新や削除が行えます。

### 認証
`withAuthenticator` コンポーネントにより、ログイン状態の管理が自動で行われます。

### ESLint の設定
ESLint の拡張設定は、`my-todo-app/eslint.config.js` 内で管理されています。プロダクション環境向けには型チェックも有効にする設定が推奨されています。

### Amplify のセットアップ
Amplify の設定は、`my-todo-app/src/amplifyconfiguration.json` で行われています。AWS Amplify CLI を使用してバックエンドのリソース（GraphQL API、認証など）の管理を行っています。

### 参考資料
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [AWS Amplify](https://docs.amplify.aws/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)

### ライセンス
詳細は [LICENSE](LICENSE) をご確認ください。
