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
 * An user as the API accepts it for creation.
 */
export interface ApiInputUser {
  name: string;
}

/**
 * An user as exposed in the API.
 */
export interface ApiUser {
  id: string;
  name: string;
}

/**
 * A booking as exposed in the API.
 */
export interface ApiBooking {
  id: string;
  property_id: string;
  property_name: string;
  property_location: string;
}

/**
 * A booking including an user as exposed in the API.
 */
export interface ApiBookingWithUser extends ApiBooking {
  user: ApiUser;
}
