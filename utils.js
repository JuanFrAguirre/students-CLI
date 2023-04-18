import path from 'path'
import { fileURLToPath } from 'url'

export const preMsg = '--------------------------\n'
export const postMsg = ' \n--> '
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
