export default interface IMotocycle {
  id?: string | undefined
  model: string
  year: number
  color: string
  status?: boolean
  buyValue: number
  category: string
  engineCapacity: number
}