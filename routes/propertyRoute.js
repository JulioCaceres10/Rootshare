import express from "express";
import { body } from "express-validator";
import { admin, propertyModels, propertyCreation, uploadImage, publishedProperty, infoProperty, editProperty, deleteProperty } from "../controllers/propertyController.js";
import upload from "../middleware/uploadImage.js";

const router = express.Router();

router.get('/properties', admin)

router.get("/", (req, res) => {
  return res.json(req.user);
});
router.get("/property/models", propertyModels);

router.post( "/property/creation",
  body("title").isLength({ min: 4 }).withMessage("Titulo invalido"),
  body("description").isLength({ min: 4 }).withMessage("Descripcion invalida"),
  body("category").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("price").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("rooms").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("parking").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("wc").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("latitude").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("length").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("city").notEmpty().withMessage("Selecciona la ubicacion"),

  propertyCreation
);

router.post("/property/image/:id", upload.single('image', {name: 'image'}), uploadImage);

router.put('/property/published/:id', publishedProperty);

router.get('/property/edit/:id', infoProperty);
router.put('/property/edit/:id',

  body('title').isLength({ min: 4 }).withMessage("Titulo invalido"),
  body("description").isLength({ min: 4 }).withMessage("Descripcion invalida"),
  body("category").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("price").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("rooms").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("parking").isNumeric().notEmpty().withMessage("Campo vacio"),
  body("wc").isNumeric().notEmpty().withMessage("Campo vacio"),
  
  editProperty
);

router.delete('/property/delete/:id', deleteProperty);



export default router;
