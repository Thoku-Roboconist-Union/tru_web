# TRU Web

Tohoku Roboconist Union の公式サイトです。

## 構成

- `index.html`: ホーム
- `about.html`, `activities.html`, `members.html`, `results.html`, `gallery.html`, `blog.html`, `contact.html`: 各画面
- `admin.html`: デモ管理画面
- `styles/main.css`: 共通スタイルとテーマトークン
- `scripts/app.js`: 共通ヘッダー/フッター、テーマ、モバイルメニュー、画面固有の動作
- `assets/images/`: 画像アセット

各画面は通常のHTMLリンクで遷移します。ヘッダーとフッターだけは `scripts/app.js` から共通注入するため、ページごとの重複記述を避けています。

テーマは右上のボタンから切り替えられます。選択状態はブラウザの `localStorage` に保存されます。

## ローカル確認

```bash
python3 -m http.server 8000
```

ブラウザで <http://localhost:8000/> を開いてください。

管理画面はフッターの Admin から開けます。デモ用ログインは `admin / tru2025` です。静的サイト内のデモ認証なので、本番運用ではサーバー側認証に置き換えてください。
