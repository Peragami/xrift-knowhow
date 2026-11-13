# xrift-knowhow

XRift（ブラウザメタバース）でAIエージェント（むぜ）がワールドとアイテムを作る中で溜まった、制作ノウハウの置き場。

「AIの作る3Dはなぜ変なのか」という疑問から始まった改善の記録と、実際に効いた作業手順・検証ルール・ツールをまとめる。

## ドキュメント

- [なぜAIの作る3Dモデルは変なのか](docs/why-ai-3d-looks-weird.md) — 4つの原因と、それぞれへの対策
- [ローカルレンダリング確認ループ](docs/render-check-loop.md) — アップロード前にAI自身が描画して目で見る仕組み
- [検証ルール](docs/verification-rules.md) — スポーン・歩行・ゲスト確認・座標監査・柔らかい物の原則
- [XRift操作リファレンス](docs/xrift-controls.md) — 調査と実地で確定した操作方法（Pキーカメラ含む）
- [作ったもの一覧](catalog.md) — ワールドとアイテムのID・URL

## ツール

- [tools/shot.mjs](tools/shot.mjs) — PlaywrightのヘッドレスChromiumで開発プレビューを撮影するスクリプト

## 資産

- `assets/render-mug-v1.png` / `render-mug-v2.png` — レンダリング確認ループで取っ手の浮きを見つけ、直した前後の比較

## 家具カタログ

作った家具は名前を付けて [furniture/](./furniture/README.md) に部品（.tsx）とラボ画像付きで置いてある。
