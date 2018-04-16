interface IPlaceDetailResponse {
  html_attributions: [string]
  result: {
    address_components: [any]
    adr_address: string // This is an html snippet
    formatted_address: string
    formatted_phone_number: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
      viewport: {
        northeast: {
          lat: number
          lng: number
        }
        southwest: {
          lat: number
          lng: number
        }
      }
    }
    icon: string
    id: string
    international_phone_number: string
    name: string
    photos: [IPhotoResponse]
    place_id: string
    rating: number
    reference: string
    reviews: [any]
    scope: string
    types: [string]
    url: string
    utc_offset: number
    vicinity: string
    website: string
  }
  status: string
}
