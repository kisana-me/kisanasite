export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

export const pageview = (url) => {
  window.gtag("config", GA4_ID, {
    page_path: url,
  })
}
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}