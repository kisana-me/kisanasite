---
title: 'ANYUR'
order: 1
summary: 'アカウントシステム'
description: '私が運営しているサービスで使用するアカウントを一元管理するシステムです。'
icon: '/images/anyur/anyur-logo.png'
image: '/images/anyur/anyur-1.png'
---

![ANYURのスクリーンショット5枚](https://m.ivecolor.com/ivecolor/images/variants/normal/3zkqxb179gd2a4.webp)

## 概要

一番新しいプロジェクト。

複数アカウント同時サインインができる。

Stripeを使ったサブスクプランに加入できる。

他のサービス(現状ではBeAlive.と得句巣のみ)にパスワードレスサインイン(OAuthを利用したSSO)ができる。

現在は以下のサービスにSSOできます。

- Amiverse
- IVECOLOR
- BeAlive.
- 得句巣

## リンク

- [anyur.com](https://anyur.com)
- [GitHubリポジトリ](https://github.com/kisana-me/anyur)
- [個人開発の成果物をまとめた記事](https://ivecolor.com/posts/gf7p3068lk49ezbcv)

## 開発時期

2025年4月~/2か月

## 使用技術

- バックエンド Ruby on Rails
- DB MariaDB
- 決済 Stripe

## 作成した背景

個人開発したサービスごとにアカウント管理をするのは大変だろうと思い、一つのアカウントを作成するだけで複数のサービスを利用できるようにしたいと思ったのが始まり。

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

今後も個人開発プロダクトが増えていくので相互連携をうまくとれるようにしていく。アイコン・実績機能などを追加予定。
