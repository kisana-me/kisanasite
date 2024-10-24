---
title: 'markdownのテスト'
date: '2024-10-24 21:00'
update: ''
description: 'テストページです'
image: ''
tag: ['test', 'テスト']
---

[[toc]]

## 以下 markdown-it の検証

### 改行

あいうえお改行のみ
あかさたな

あいうえお改行２回！

あｓｄｆｇｈｊｋｌ

こんにちは、スペースふたつと改行  
改行した

こんどはｂｒ改行<br />
つかえるの？

かいぎょうさんかい


しました

```text
あいうえお改行のみ
あかさたな

あいうえお改行２回！

あｓｄｆｇｈｊｋｌ

こんにちは、スペースふたつと改行  
改行した

こんどはｂｒ改行<br />
つかえるの？

かいぎょうさんかい


しました
```

### ライン
---
```md
---
```
## 以下 markdown-it プラグイン の検証

### container

::: warning
ワーニング！here be dragons
:::

::: info
i info
:::

### mark

==マークされた==文字

### ins

++inserted++されたもじ

### abbr

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.

### sup

29^th^

### sub

H~2~O

### footnote

asdfghjkl[^1]zxcvbnm

[^1]: description?

### multimd-table

|             |          Grouping           ||
|First Header  | Second Header | Third Header |
| ------------ | :-----------: | -----------: |
|Content       |          *Long Cell*        ||
|Content       |   **Cell**    |         Cell |
||LONG CELL||
|New section   |     More      |         Data |
|And more      | With an escaped '\\|'       ||

aaa


|--|--|--|--|--|--|--|--|
|♜|  |♝|♛|♚|♝|♞|♜|
|  |♟|♟|♟|  |♟|♟|♟|
|♟|  |♞|  |  |  |  |  |
|  |♗|  |  |♟|  |  |  |
|  |  |  |  |♙|  |  |  |
|  |  |  |  |  |♘|  |  |
|♙|♙|♙|♙|  |♙|♙|♙|
|♖|♘|♗|♕|♔|  |  |♖|

### toc

[[toc]]

### task-list

- [ ] asdf
- [x] asdf

x?