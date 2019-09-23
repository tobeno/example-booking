import express, { Request, Response } from "express";
import { Services } from "./services";
import { HerePlacesItem } from "./clients/HerePlacesClient";
import { asyncMiddleware } from "./middlewares";
import { Booking } from "./model/schemas/BookingSchema";
import { ApiBooking, ApiProperty, ApiUser } from "./types";

export function createRouter({
  apiMapper,
  herePlacesClient,
  model,
}: Services): express.Router {
  const router = express.Router();

  router.route("/properties").get(
    asyncMiddleware(
      async (req: Request, res: Response): Promise<void> => {
        if (!req.query.at) {
          throw new Error("Required at parameter missing.");
        }

        const items = await herePlacesClient.browse(
          req.query.at,
          ["hotel"],
          50,
        );

        res.json({
          data: items.map(
            (item: HerePlacesItem): ApiProperty => apiMapper.mapProperty(item),
          ),
        });
      },
    ),
  );

  router.route("/users/:userId/bookings").get(
    asyncMiddleware(
      async (req: Request, res: Response): Promise<void> => {
        if (!req.params.userId) {
          throw new Error("No user ID given.");
        }

        const bookings = await model.Booking.find({
          user: req.params.userId,
        })
          .populate("user")
          .exec();

        res.json({
          data: bookings.map(
            (booking: Booking): ApiBooking => apiMapper.mapBooking(booking),
          ),
        });
      },
    ),
  );

  router.route("/properties/:propertyId/bookings").get(
    asyncMiddleware(
      async (req: Request, res: Response): Promise<void> => {
        if (!req.params.propertyId) {
          throw new Error("No property ID given.");
        }

        const bookings = await model.Booking.find({
          propertyId: req.params.propertyId,
        })
          .populate("user")
          .exec();

        res.json({
          data: bookings.map(
            (booking: Booking): ApiBooking => apiMapper.mapBooking(booking),
          ),
        });
      },
    ),
  );

  router
    .route("/bookings")
    .get(
      asyncMiddleware(
        async (req: Request, res: Response): Promise<void> => {
          const bookings = await model.Booking.find()
            .populate("user")
            .exec();

          res.json({
            data: bookings.map(
              (booking: Booking): ApiBooking => apiMapper.mapBooking(booking),
            ),
          });
        },
      ),
    )
    .post(
      asyncMiddleware(
        async (req: Request, res: Response): Promise<void> => {
          const body = req.body;

          if (!body) {
            throw new Error("Body missing in request.");
          }

          const apiBooking: ApiBooking = body;
          const apiUser: ApiUser | undefined = apiBooking.user;
          if (!apiUser) {
            throw new Error("user field missing in request.");
          }

          const booking = apiMapper.mapApiBooking(apiBooking);

          try {
            await booking.user.save();
          } catch (err) {
            throw new Error(`Given user could not be saved. ${err.message}`);
          }

          try {
            await booking.save();
          } catch (err) {
            // Delete the user if the booking could not be saved
            await model.User.deleteOne({ _id: booking.user.id });

            throw new Error(`Given booking could not be saved. ${err.message}`);
          }

          res.json({
            data: apiMapper.mapBooking(booking),
          });
        },
      ),
    );

  return router;
}
