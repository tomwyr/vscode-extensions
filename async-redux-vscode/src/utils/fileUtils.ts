import { readFile, writeFile } from "fs"
import mkdirp = require("mkdirp")

export async function readFileData(path: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    readFile(path, (error, data) => {
      error != null ? reject(error) : resolve(data)
    })
  })
}

export async function writeFileData(path: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    writeFile(path, data, (error) => {
      error != null ? reject(error) : resolve()
    })
  })
}

export async function createDirectory(path: string) {
  return new Promise<void>((resolve, reject) => {
    mkdirp(path, (error) => {
      if (error) {
        return reject(error)
      }
      resolve()
    })
  })
}
