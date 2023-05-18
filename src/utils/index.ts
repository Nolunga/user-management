import format from 'date-fns/format'

export const API_HOST = import.meta.env.VITE_APP_API_HOST

export const getDateOfBirth = (idNumber: number) => {
  let year = idNumber.toString().substring(0, 2)
  const month = idNumber.toString().substring(2, 4)
  const day = idNumber.toString().substring(4, 6)

  let fullYear
  if (parseInt(year) >= 0 && parseInt(year) <= 21) {
    fullYear = '20' + year
  } else {
    fullYear = '19' + year
  }

  const dob = format(new Date(`${fullYear}-${month}-${day}`), 'dd MMMM yyyy')
  return dob
}

export const getAge = (idNumber: number) => {
  let age = 0
  const dob = getDateOfBirth(idNumber)

  age = new Date().getFullYear() - new Date(dob).getFullYear()

  return age
}

export const returnGender = (gender: string) => (gender === 'M' ? 'Male' : 'Female')
