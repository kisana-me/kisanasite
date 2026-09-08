/**
 * 日時の表示。**タイムゾーンを固定する。**
 *
 * 静的書き出しなので HTML はビルド環境の時刻で焼かれ、その後ブラウザが
 * 同じ場所を描き直す。`toLocaleString` を素で呼ぶと両者がずれて
 * ハイドレーションの警告が出る。
 */
const FORMAT = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDateTime(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : FORMAT.format(date)
}
