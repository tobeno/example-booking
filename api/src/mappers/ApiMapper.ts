import { User } from "../model/schemas/UserSchema";
import { Booking } from "../model/schemas/BookingSchema";
import { Model } from "../model";
import { HerePlacesItem } from "../clients/HerePlacesClient";
import { ApiBooking, ApiProperty, ApiUser } from "../types";

class ApiMapper {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  mapApiBooking(booking: ApiBooking): Booking {
    if (!booking.user) {
      throw new Error("User missing in booking.");
    }

    const user = this.mapApiUser(booking.user);

    return new this.model.Booking({
      propertyId: booking.property_id,
      propertyName: booking.property_name,
      city: booking.city,
      user,
    });
  }

  mapApiUser(user: ApiUser): User {
    return new this.model.User({
      name: user.name,
    });
  }

  mapProperty(item: HerePlacesItem): ApiProperty {
    return {
      id: item.id,
      name: item.title,
      distance: item.distance,
      location: item.vicinity || "",
    };
  }

  mapUser(user: User): ApiUser {
    return {
      id: user.id,
      name: user.name,
    };
  }

  mapBooking(booking: Booking): ApiBooking {
    return {
      id: booking.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: booking.propertyId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: booking.propertyName,
      city: booking.city,
      user: this.mapUser(booking.user),
    };
  }
}

export default ApiMapper;
