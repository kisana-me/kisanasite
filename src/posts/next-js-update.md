---
title: 'Next.jsのバージョンアップ'
date: '2024-01-07 20:22'
update: '2024-01-07 21:26'
description: 'next.jsのアップデート方法'
image:
tag: [next.js, ]
---

[[toc]]

# 3コマンドするだけ！
予め.nextとnode_modulesを削除しておきます。
ホストからコンテナ内のbashに入ります。
```sh
docker compose run --rm app bash
```
アップデートします。
```sh
npm i next@latest react@latest react-dom@latest
```
その他package.json内のパッケージをアップデート
```sh
npm i next-pwa@latest
```