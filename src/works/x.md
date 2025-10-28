---
title: '得句巣'
order: 5
summary: '漢字とアルファベットのSNS'
description: '漢字は必須、アルファベットは任意、平仮名と片仮名は使用できないSNSです。'
icon: '/images/x/x-logo.png'
image: '/images/x/x-1.png'
---

![得句巣のスクリーンショット5枚](https://m.ivecolor.com/ivecolor/variants/images/images/2shanm5g3ifv6ezq7.webp)

## 概要

漢字しか使えないSNS。投稿へのリアクションは｢良｣｢可｣｢不可｣。返信もできる。

## リンク

- [x.amiverse.net](https://x.amiverse.net)
- [GitHubリポジトリ](https://github.com/kisana-me/x)
- ![得句巣のスクリーンショット5枚](https://m.ivecolor.com/ivecolor/variants/images/images/2shanm5g3ifv6ezq7.webp)

## 開発時期

2024年12月~/2日ほど

## 使用技術

- バックエンド Ruby on Rails
- DB MariaDB

## 作成した背景

個人開発から生まれた｢対多｣という漢字しか使えないSNSアプリがバズっていて、これは正規表現のバリデーションかけるだけで簡単に作れるのではないかと思い、作った。

｢対多｣との差別化として、ネイティブアプリで作成するのではなくてwebアプリとして作成し、サインイン等を必須としないことで誰でも気軽に使える点がある。

## こだわった点

最近のRailsに追加されたHotwireの機能を使ってシームレスなタイムラインを作成した。1番下で読込ボタンを押すと続きが画面遷移無しに読み込まれる。

BeAlive.で作成したコードを転用してANYURアカウントでOAuthを使ったSSOができるようになっている。

## 苦労した点

正規表現で漢字の範囲を選択するところ。

## 今後の展望

限定的にアルファベットも使える機能を追加したい。
