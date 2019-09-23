/**
 * A property as exposed in the API.
 */
export interface ApiProperty {
  id: string;
  name: string;
  distance?: number;
  location: string;
}

/**
 * An user as exposed in the API.
 */
export interface ApiUser {
  id?: string;
  name: string;
}

/**
 * A booking as exposed in the API.
 */
export interface ApiBooking {
  id?: string;
  property_id: string;
  property_name: string;
  property_location: string;
  date: string;
  nights: number;
  user?: ApiUser;
}
