# ローカルレンダリング確認ループ

アップロード前に、AIエージェント自身がプロジェクトの開発プレビューを描画してスクリーンショットで目視確認する仕組み。2026-11-13にマグカップのアイテムで実証（取っ手の下端の浮きを出荷前に発見・修正できた）。

## セットアップ（初回のみ）

```bash
mkdir render-tools && cd render-tools
npm init -y
npm i playwright
npx playwright install --only-shell chromium
```

- VM標準の `/opt/meta-chromium/chrome` はポリシーで直接起動できない（"Hatch WebGL domain policy is required"）ため、Playwright付属のChromiumを使う。
- WebGLは SwiftShader（ソフトウェア描画）で動く。`shot.mjs` は `--enable-unsafe-swiftshader` を付けて起動する。

## 使い方

```bash
# 1. 対象プロジェクトで開発サーバーを起動
cd <project> && npm run dev -- --port 5173 --host 127.0.0.1

# 2. 撮影
node tools/shot.mjs http://127.0.0.1:5173/ out.png [待機ms]

# 3. 画像を見て、形・浮き・めり込み・色を確認してから直す／上げる
```

## コツ

- `src/dev.tsx` は開発専用（本番ビルドに含まれない）。小物アイテムはカメラを寄せてよい（例: マグカップは `camera position [0.34, 0.27, 0.34] fov 40`、`OrbitControls target [0, 0.05, 0]`）。
- 描画の読み込み待ちは 6000〜7000ms 程度みる（シェーダ初期化とテクスチャ読み込み分）。
- これは「作る側の目」であって、ワールド内確認の代わりにはならない。スケール感・操作・正面の見え方はゲスト入室での確認と、本人の実地報告が正。
- 撮影後は開発サーバーを止める（ `fuser -k 5173/tcp` ）。

## 実例

- `assets/render-mug-v1.png`: 取っ手が輪っか状で下端が浮き、フックのように見えた
- `assets/render-mug-v2.png`: 部分トーラス（arc 280°、両端を本体に埋没）に変えて解消してからアップロード
