import generatedContent from '@/generated/content.generated'

export function getSortedMdsData(dir) {
  if (dir !== 'works') {
    throw new Error(`Unsupported dir: ${dir}`)
  }
  return generatedContent.works.sorted
}

export function getAllMdIds(dir) {
  if (dir !== 'works') {
    throw new Error(`Unsupported dir: ${dir}`)
  }
  return generatedContent.works.slugs.map((slug) => ({
    params: { slug },
  }))
}

export async function getMdData(dir, id) {
  if (dir !== 'works') {
    throw new Error(`Unsupported dir: ${dir}`)
  }
  const work = generatedContent.works.bySlug[id]
  if (!work) {
    throw new Error(`Work not found: ${id}`)
  }
  return work
}