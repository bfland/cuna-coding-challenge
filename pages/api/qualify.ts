import { NextApiRequest, NextApiResponse } from 'next'
import faker from 'faker'

const MILLION = 1000000

type FormData = {
  make: string
  model: string
}

type FormDataStrings = FormData & {
  price: string
  income: string
  creditScore: string
}

type FormDataStringsNumbers = FormData & {
  price: number
  income: number
  creditScore: number
}

const numberify = (formData: FormDataStrings): FormDataStringsNumbers => {
  return {
    ...formData,
    price: Number(formData.price),
    income: Number(formData.income),
    creditScore: Number(formData.creditScore)
  }
}

const qualify = (formData: FormDataStringsNumbers): boolean => {
  // If purchase price > 1/5th of income, return false (unqualified).
  if (formData.price > formData.income / 5) return false

  // If credit is less than 600, return false (unqualified).
  if (formData.creditScore < 600) return false

  return true
}

/**
 * Notes:
 * - I would normally implement some server-side validation if writing a complete app.
 */
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const data = numberify(JSON.parse(req.body))

  if (data.price > MILLION) {
    res.status(400)
    res.end()
    return
  }

  const qualified = qualify(data)
  res.status(200).json({ qualified })
}

export default handler
