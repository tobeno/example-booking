import express, { Request, Response } from "express";
import { herePlacesClient } from "./services";
import { HerePlacesItem } from "./clients/here/places";
import { asyncMiddleware } from "./middlewares";

const router = express.Router();

router.get(
  "/properties",
  asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.query.at) {
        throw new Error("Required at parameter missing.");
      }

      const items = await herePlacesClient.browse(req.query.at, ["hotel"], 50);

      res.json(
        items.map((item: HerePlacesItem): { id: string; name: string } => ({
          id: item.id,
          name: item.title,
        })),
      );
    },
  ),
);

export default router;
