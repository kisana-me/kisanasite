import Image from "next/image"
import Link from "next/link"
import fs from 'fs'
import path from 'path'
import ClientComponent from "./client_component"

export default async function Home() {
  function getJsonData(fileName) {
    const filePath = path.join(process.cwd(), 'data', 'home', fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  }

  const exhibitsData = getJsonData('exhibits.json')
  const projectsData =  getJsonData('projects_data.json')

  return <ClientComponent exhibitsData={ exhibitsData } projectsData={ projectsData } />
}
