---
title: 'Amiverse'
order: 2
summary: 'ソーシャルメディア'
description: '次世代のソーシャルメディアシステムを開発・運営しています。'
icon: '/images/amiverse/amiverse-logo.png'
image: '/images/amiverse/amiverse-1.png'
---

![Amiverseのスクリーンショット5枚](https://m.ivecolor.com/ivecolor/variants/images/images/yqd2xu4tza015bn3j.webp)

## 概要

一般的なSNS。ActivityPubに対応していてMisskeyやMastdonなどと投稿のやり取りができる。

画像や動画を投稿できる。リアクションができる。

## リンク

- [amiverse.net](https://amiverse.net/)
- [api.amiverse.net](https://api.amiverse.net/)
- [GitHubリポジトリ](https://github.com/kisana-me/amiverse)
- [個人開発の成果物をまとめた記事](https://ivecolor.com/posts/gf7p3068lk49ezbcv)

## 開発時期

2023年3月~/未定

## 使用技術

- バックエンド Ruby on Rails
- DB MariaDB
- オブジェクトストレージ MinIO
- 画像処理 ImageMagick
- 動画処理 FFmpeg
- 全文検索 Meilisearch
- 形態素解析 MeCab, natto
- セッション管理 Redis
- ジョブ管理 Sidekiq
- フロントエンド Next.js(React)

## 作成した背景

任天堂のSNSであるMiiverseがサ終して、それを模倣した横長ドット絵を投稿できるSNSを作りたいと思ったのが始まり(この機能は現存)。

Miiverseの亜種ということでAmiverse。

単にSNSを作ってみたかった。

## こだわった点

サインイン・サインアップ・お問い合わせなど、フォーム送信時にはCloudflare Turnstileを利用してbot対策を施した。

メールアドレスを変更するにはパスワードが、パスワードを変更するにはメール認証が必須としてセキュリティを高めた。

正しいIDで間違ったパスワードを使いサインインを試行し続けるとロックされる仕組みを実装した。

パスワードを忘れてサインインできなくなっても、再設定メールを送りリセットできるようにした。

Railsのsessionにトークンを配列で記録して複数アカウント同時サインインを実装し、モジュール化してまとめている([モジュール部分のソースコード](https://github.com/kisana-me/anyur/blob/main/src/app/controllers/concerns/session_management.rb))。

## 苦労した点

OAuthの認可・リソースサーバーを完全自作するというのが大変だった([認可とる部分のソースコード](https://github.com/kisana-me/anyur/blob/main/src/app/controllers/oauth_controller.rb), [認可する動画](https://amiverse.net/items/x61qdj0twplrazmuo))。

メール認証を必須にしているのでメールサーバーをどうするか悩んだ。このドメインから送信したいが、オンプレ環境ではop25b、SendGridなどは1日100送信まで、などの制約があり、最終的にDKIMを無視し、GmailとCloudflare Email Routingを利用して利用者に送信している(Gmailではスパム判定)。

一時期はVPS上でPostfix+Dovecotの構成で運用していたが無駄な出費と感じ契約を終えた。

## 今後の展望

SNS開発が趣味なのでいつまででも開発は続けていく。ANYURのシステムが確立した際に不特定多数のユーザーにアプローチして、多くの人に使ってもらえるプロダクトに育てたい。
