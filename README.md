# 思考行動パターン・セルフチェック

Anaxis Ltd. の12問のセルフチェックを、GitHub Pagesで公開するためのファイルです。
名前入力・ログインは不要です。回答・結果はブラウザーのメモリー内だけで扱い、送信・保存しません。

## 1．ZIPを解凍する

`anaxis-thinking-patterns-github.zip` を解凍してください。
中の `anaxis-thinking-patterns` フォルダーを開いてください。

公開に必要なファイルは、次の5つです。

- index.html：画面
- style.css：デザイン
- app.js：質問の表示・画面の切り替え・結果の図解
- core.js：12問の質問・選択肢・採点処理
- anaxis-logo.png：Anaxisロゴ（ヘッダーに表示）

このREADME.mdは公開手順です。GitHubへ一緒にアップロードして構いません。
`.nojekyll` はGitHub側の自動変換を無効にする補助ファイルです。隠しファイルとして見えなくても、今回の5ファイルはそのまま公開できます。

## 2．GitHubで新しいリポジトリを作る

1. GitHubにログインし、 https://github.com/new を開きます。
2. Repository name に `anaxis-thinking-patterns` と入力します。
3. 公開範囲に **Public** を選びます。
4. **Create repository** を押します。

既存のアンケートと混ざらないよう、今回は新しいリポジトリを作る方法です。

## 3．ファイルをアップロードする

1. 作成直後の画面で **uploading an existing file** を押します。
   既にファイルがある場合は **Add file → Upload files** を選びます。
2. 解凍フォルダーの中にある `index.html`、`style.css`、`app.js`、`core.js`、`anaxis-logo.png` の5ファイルを、まとめてドラッグします。
   `README.md` も一緒にアップロードできます。
3. **Commit changes** を押します。確認画面が出たら、変更を確定します。
4. リポジトリの最初の階層に `index.html` が並んでいることを確認します。

**ZIPそのものや、外側のフォルダーごとアップロードしないでください。**
`index.html` がリポジトリ直下にあることが大切です。

## 4．GitHub Pagesを有効にする

1. リポジトリの **Settings** を開きます。
2. 左側の **Pages** を選びます。
3. **Build and deployment** の **Source** を **Deploy from a branch** にします。
4. **Branch** を **main**、フォルダーを **/ (root)** にします。
5. **Save** を押します。
6. 公開処理が終わると、Pages画面に公開URLと **Visit site** が表示されます。

公開URLの形：

`https://＜GitHubのユーザー名または組織名＞.github.io/anaxis-thinking-patterns/`

実際のURLはGitHubのPages画面で確認してください。
利用者はGitHubやChatGPTへのログインなしで開けます。

## 5．公開後に確認する

- トップの「セルフチェックをはじめる」が動くこと。
- 各問で「最も近い」「次に近い」を異なる選択肢から選べること。
- 12問の回答後にグラフ・得点・解説が出ること。
- 回答の見直し・やり直しができること。
- スマートフォンでも文字と選択欄が読めること。
- ログアウト状態やプライベートブラウズでも開けること。

公開直後に404になる場合は、Pagesの処理状態を確認し、しばらくしてから開き直してください。

## 更新するとき

同じリポジトリで **Add file → Upload files** を開き、修正した同名のファイルをアップロードし、変更を確定します。
公開設定をやり直す必要はありません。反映後も古い内容が見える場合は、ブラウザーを再読み込みしてください。

## 採点方法

各問の上から順に、達成支配欲求・アナライズ欲求・貢献奉仕欲求・クリエイティブ欲求に対応します。
「最も近い」は2点、「次に近い」は1点。12問の合計は36点で、各欲求の得点範囲は0〜24点です。
同点の最高得点がある場合は、該当する欲求を併記します。

## 技術仕様

ビルド・インストール・データベース・APIキーは不要です。
すべての参照が相対パスになっているため、GitHub Pagesのリポジトリ配下のURLでも動作します。
JavaScriptのモジュールを使用するため、動作確認は公開URLで行ってください。パソコン上でindex.htmlを直接ダブルクリックした場合、ブラウザーの制限で動かないことがあります。

## GitHub公式ガイド

- 作成：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- 公開元の設定：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Copyright © Anaxis Ltd.
