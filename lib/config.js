/**
 * 公開フォームの投稿先。
 *
 * **CMS は別オリジン**なので絶対URLで叩く。受け側は `Origin` を見てサイトを
 * 決めるので（CMS の docs/routes.md 2章）、`sites.url` に登録したオリジンと
 * 一致していないと 403 になる。**`localhost:3000` から投げても通らない。**
 *
 * **サイトキーは公開値。** HTML に出る前提のもので、秘密ではない
 * （検証に使うシークレットは CMS 側がサイトごとに持つ）。空ならウィジェットを
 * 出さず、送信も止めない — CMS 側もシークレット未設定なら素通しする。
 */
export const FORMS = {
  apiBase: process.env.NEXT_PUBLIC_CMS_API_BASE || 'https://cms.kisana.me',
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
}
