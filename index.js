import fs from 'fs'
import path from 'path'
import rl from 'readline-sync'
import { __dirname, postMsg, preMsg } from './utils.js'

// MAIN

console.clear()
export let addStudentFlag = false
let mainFlag = true
while (mainFlag) {
  switch (
    rl.question(
      msg(
        `Do you want to add a student or read the list of students? (or exit) \`read\`, \`add\` or \`exit\``,
      ),
    )
  ) {
    case 'read': {
      console.clear()
      console.log(readStudents())
      break
    }
    case 'add': {
      addStudentFlag = true
      console.clear()
      while (addStudentFlag) {
        addStudent()
      }
      break
    }
    case 'exit': {
      mainFlag = false
      break
    }
  }
}

// ----------------------------------------------------------------
//  FUNCTIONS

function msg(text, options) {
  if (options === 'pre') return preMsg + text
  if (options === 'post') return text + postMsg
  return preMsg + text + postMsg
}

function writeToStudents(data) {
  fs.writeFileSync(
    path.join(__dirname, 'students.json'),
    JSON.stringify([...readStudents(), { ...data }], null, 4),
  )
}

function readStudents() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'students.json')))
}

function addStudent() {
  const firstName = rl.question(msg(`Enter first name:`))
  const lastName = rl.question(msg(`Enter last name:`))
  const grade1 = Number(rl.question(msg(`Enter grade of 1st exam:`)))
  const grade2 = Number(rl.question(msg(`Enter grade of 2nd exam:`)))
  const grade3 = Number(rl.question(msg(`Enter grade of 3rd exam:`)))
  if (
    rl.keyInYN(
      msg(
        `Name: ${firstName} ${lastName} - Grades: ${grade1}, ${grade2}, ${grade3} -- Is this correct?`,
      ),
    )
  ) {
    writeToStudents({
      firstName,
      lastName,
      grade1,
      grade2,
      grade3,
      average: ((grade1 + grade2 + grade3) / 3).toFixed(2),
    })
    console.log(msg(`Succesfully added ${firstName} ${lastName}`, 'pre'))
  }
  if (!rl.keyInYN(msg('Keep adding?'))) addStudentFlag = false
}
