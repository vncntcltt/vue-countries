import { Language, RegionalBloc, Currency } from './index'

export interface Country {

  name: string
  alpha3Code: string
  capital: string
  region: string
  subregion: string
  population: number
  area: number
  languages: Language[]
  currencies: Currency[]
  regionalBlocs: RegionalBloc[]
  timezones: string[]

}
