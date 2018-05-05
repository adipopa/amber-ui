interface IPlaceResponse {
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  icon: string
  id: string
  name: string
  opening_hours: {
    open_now: boolean
  }
  photos: IPhotoResponse
  place_id: string
  scope: string
  alt_ids: {place_id: string, scope: string}[]
  reference: string
  types: [string]
  vicinity: string
}
