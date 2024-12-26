export interface Location {
  coords: {
    latitude: number
    longitude: number
  }
}

export interface WeatherType {
  code: number
  description: string
  icon: string
}