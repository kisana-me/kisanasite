---
title: 'BeAlive.'
order: 4
summary: '生存確認SNS'
description: '写真を共有しあって生存確認をするSNSです。'
icon: '/images/bealive/bealive-logo.png'
image: '/images/bealive/bealive-1.png'
---

![BeAlive.のスクリーンショット5枚](https://m.ivecolor.com/ivecolor/variants/images/images/t0k95brlscjhg1zoe.webp)

## 概要

「BeReal.」というSNSを真似て作った。

キャプチャ画面で撮影を押すと、3秒カウントダウン→撮影→カメラ切りかえ→3秒カウントダウン→撮影、というようにしてフロントカメラとバックカメラで2枚の写真を撮影する。これを色んな人と共有するというSNS。

アカウントを持つ人がリクエストを発行でき、そのリクエストURLを他人になんらかの方法で送る。送られてきた人はサインインしていなくても撮影ができる。

## リンク

- [bealive.amiverse.net](https://bealive.amiverse.net)
- [GitHubリポジトリ](https://github.com/kisana-me/bealive)
- [個人開発の成果物をまとめた記事](https://ivecolor.com/posts/gf7p3068lk49ezbcv)

## 開発時期

2024年6月~/1週間ほど

## 使用技術

- バックエンド Ruby on Rails
- DB MariaDB
- オブジェクトストレージ MinIO
- 画像処理 ImageMagick

## 作成した背景

「BeReal.」との差別化で、だれでもいつでもリクエストを送信出来たら面白そうと思った。

この仕組みで高齢者の生存確認ができるのではないかとも思った。そこからサインインしていなくてもリクエストがあれば簡単にWeb上で撮影できる仕組みを思いついた。

## こだわった点

Amiverseで作成した画像配信技術を転用している。

Web上で撮影が完結するところ。

ANYURアカウントでOAuthを使ったSSOができるところ([ソースコード](https://github.com/kisana-me/bealive/blob/main/src/app/controllers/sessions_controller.rb), [SSOする動画](https://amiverse.net/items/x61qdj0twplrazmuo))。

## 苦労した点

Web上でカメラを扱うのが難しかった。加えてフロントエンドは最近のRailsに組み込まれているStimulusを初めて使ったので新技術を扱うという労力があった。

## 今後の展望

ネイティブアプリ化したい。
