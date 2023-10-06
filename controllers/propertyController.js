import { validationResult } from "express-validator";
import { Category, Price, Property, Message } from "../models/index.js";
import cloudinary from "../config/cloudinary.js";


const admin = async (req, res) => {
  const { id } = req.user;

  const properties = await Property.findAll({
    where: {
      userId: id,
    },
    include: [
      { model: Category, as: "category" },
      { model: Price, as: "price" },
      { model: Message, as: "messages" },
    ],
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return res.json(properties);
};
const propertyModels = async (req, res) => {
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);

  return res.json({ categories, prices });
};

const propertyCreation = async (req, res) => {
  // validar resultado
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const errData = {
      title: "Error al crear la propiedad",
      subtitle: "Vuelve a intentarlo",
      color: "error",
      boolean: true,
    };
    return res.json(errData);
  }

  // registrar propiedad
  const {
    title,
    description,
    category,
    price,
    rooms,
    parking,
    wc,
    latitude,
    length,
    city,
  } = req.body;
  const { id: userId } = req.user;

  try {
    const propertyData = await Property.create({
      title,
      description,
      categoryId: category,
      priceId: price,
      rooms,
      parking,
      wc,
      latitude,
      length,
      city,
      userId,
    });
    const { id } = propertyData;
    const uploadImage = {
      boolean: true,
      id,
    };

    return res.json(uploadImage);
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByPk(id);

  // validacion del usuario
  if(property.userId.toString() !== req.user.id.toString()) return 
  
  // Atualiza los datos de la imagen
  if (property.id_image !== null && property.image !== null) {
    // elimina la imagen de la nube
    await cloudinary.uploader
      .destroy([property.id_image], {
        type: "upload",
        resource_type: "image",
      })
      .then(console.log);

    // Reescribe la nueva imagen
    try {
      await cloudinary.uploader
        .upload(req.file.path, {
          folder: "rootshare",
          resource_type: "image",
        })
        .then(async (response) => {

          // almacenar imagen y publicar propiedad
          property.set({
            id_image: await response.public_id,
            image: await response.secure_url,
            published: 1,
          });

          await property.save();
        });
        const successImage = {
          title: "Imagen Actualizada",
          subtitle: "Carga exitosa",
          color: "info",
          boolean: true,
        };
        return res.json(successImage);
    } catch (error) {
      console.log(error);
    }

  }

  // añade la imagen 
  try {
    await cloudinary.uploader
      .upload(req.file.path, {
        folder: "rootshare",
        resource_type: "image",
      })
      .then(async (response) => {
        // almacenar imagen y publicar propiedad
        property.id_image = await response.public_id;
        property.image = await response.secure_url;
        property.published = 1;
        await property.save();
      })
      .catch((error) => {
        return console.log(error);
      });

    const successImage = {
      title: "Propiedad Creada",
      subtitle: "Creacion de propiedad exitosa",
      color: "info",
      boolean: true,
    };
    return res.json(successImage);
  } catch (error) {
    console.log(error);
  }
};

const publishedProperty = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByPk(id);

  // validacion del usuario
  if(property.userId.toString() !== req.user.id.toString()) return 
  
  try {
    if (property.published) {
      property.published = 0;
      await property.save();
      const responseProperty = {
        title: "Cambios realizados",
        subtitle: "Propiedad no publicada",
        color: "info",
        boolean: true,
      };
      return res.json(responseProperty);
    } else {
      property.published = 1;
      await property.save();
      const responseProperty = {
        title: "Cambios realizados",
        subtitle: "Propiedad publicada",
        color: "info",
        boolean: true,
      };
      return res.json(responseProperty);
    }
  } catch (error) {
    console.log(error);
  }
};

const infoProperty = async (req, res) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);
  const info = {
    title: property.title,
    description: property.description,
    rooms: property.rooms,
    parking: property.parking,
    wc: property.wc,
    category: property.categoryId,
    price: property.priceId,
  };
  return res.json(info);
};

const editProperty = async (req, res) => {
  const {id} = req.params
  const {title, description, rooms, parking, wc, category: categoryId, price: priceId} = req.body
  const property = await Property.findByPk(id)

  // validacion del usuario
  if(property.userId.toString() !== req.user.id.toString()) return 

  // validar resultado
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const errData = {
      title: "Error al crear la propiedad",
      subtitle: "Vuelve a intentarlo",
      color: "error",
      boolean: true,
    };
    return res.json(errData);
  }

  try {
    // Reescribiendo datos de la propiedad
    property.update({
      title, 
      description, 
      rooms, 
      parking,
      wc, 
      categoryId, 
      priceId
    })

    await property.save()

    const successProperty = {
      title: "Propiedad Actualizada",
      subtitle: "Datos cargados correctamente",
      color: "info",
      boolean: true,
    };
    return res.json(successProperty);
    

  } catch (error) {
    console.log(error)
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params
  const property = await Property.findByPk(id)


   // validacion del usuario
  if(property.userId.toString() !== req.user.id.toString()) return 

  try {
    // elimina la imagen de la nube
    cloudinary.uploader
      .destroy([property.id_image], {
        type: "upload",
        resource_type: "image",
      })
      .then(console.log);

    await property.destroy()

    const responseProperty = {
      title: "Propiedad eliminada",
      subtitle: "Eliminacion exitosa",
      color: "info",
      boolean: true,
    }

    return res.json(responseProperty)

  } catch (error) {
    console.log(error)
  }

}
 

export {
  admin,
  propertyModels,
  propertyCreation,
  uploadImage,
  publishedProperty,
  infoProperty,
  editProperty,
  deleteProperty
};
