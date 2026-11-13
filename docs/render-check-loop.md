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

## ワールド全体の多角度確認（DevEnvironment + SpawnPoint上書き）

ワールドは DevEnvironment のプレイヤー視点でしか描画できないが、`SpawnPoint` は「最後に登録されたものが有効」という仕様がある。開発専用エントリ（`preview.html` + `src/preview.tsx`、本番ビルド対象外）で `<World />` の後に `<SpawnPoint position={...} yaw={...} />` を置くと、任意の位置・向きからの一人称ビューを撮影できる。

- yaw の対応: 0=北（-Z）、90=西、180=南、270=東
- 制約: 目の高さは約1.6m固定で、ピッチ（上下の向き）は変えられない。机の上の小物や布の垂れなど「見下ろす」画角は取れないので、最終確認はワールド内（Pカメラ）で行う
- Playwright のマウス操作ではポインターロックの視点回転が効かない（CDP の合成イベントでは movementX が渡らない）。キー移動も同様に届かなかった。入力シミュレーションで回そうとしないこと

## 家具ラボ（1点ずつの単体確認）

ワールド全体の描画では家具を1つずつ寄って見られない（プレイヤー視点は目の高さ固定・ピッチ不可）。そこで家具を部品コンポーネントに切り分け（`src/parts.tsx` に共通部品、`src/furniture.tsx` に BedSet／DeskSet／ChestSet／ShelfSet／CeilingLight）、素の Canvas + OrbitControls の開発専用ページ（`lab.html` + `src/lab.tsx`、`?item=` で切替）で単体描画して確認する。明るいステージ照明＋床だけの空間なので、形の破綻がそのまま見える。

- 状態（ランプON等）は props で渡す。Interactable／Seat はプロバイダ無しでも描画はできた（操作まではしない前提）
- 切り分け前後でワールドのスポーン描画がバイト一致することを確認してから進めた（リファクタで見た目を変えない証明）
- ラボで見つけた実例: クッションと折り返しが同色で融合、布団の角の尖り、裾の機械的な波、チェスト前板の隙間過多。いずれも全体描画では見えなかった
