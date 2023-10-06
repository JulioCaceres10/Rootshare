import { Category, Price, Property, User, Message } from "../models/index.js";
import { validationResult } from "express-validator";
import owner from "../helpers/index.js";

const dashboard = async (req, res) => {
  const properties = await Property.findAll({
    where: {
      published: 1,
    },
    include: [
      { model: Category, as: "category" },
      { model: Price, as: "price" },
      { model: User, as: "user" },
    ],
  });
  return res.json(properties);
};

const property = async (req, res) => {
  const { id } = req.params;

  // verificar que la propiedad exista
  const property = await Property.findOne({
    where: { id },
    include: [
      { model: Category, as: "category" },
      { model: Price, as: "price" },
    ],
  });

  if (!property) {
    const info = {
      error: true,
      data: {},
    };
    return res.json(info);
  }
  if (!property.image) {
    const info = {
      error: true,
      data: {},
    };
    return res.json(info);
  }


  const info = {
    error: null,
    data: property,
    owner: owner(req.user?.id, property.userId)
  };
  return res.json(info);
};

const publicModels = async (req, res) => {
  const [categories, prices, houses, apartments] = await Promise.all([
    Category.findAll({ raw: true }),
    Price.findAll({ raw: true }),
    Property.findAll({
      limit: 6,
      where: {
        published: 1,
        categoryId: 1,
      },
      include: [
        { model: Price, as: "price" },
        { model: User, as: "user" },
      ],
      order: [["createdAt", "DESC"]],
    }),
    Property.findAll({
      limit: 6,
      where: {
        published: 1,
        categoryId: 2,
      },
      include: [
        {
          model: Price,
          as: "price",
        },
        { model: User, as: "user" }
      ],
      order: [["createdAt", "DESC"]],
    }),
  ]);

  return res.json({ categories, prices, houses, apartments });
};

const sendMessage = async (req, res) => {
  const { id } = req.params;

  // verificar que la propiedad exista
  const property = await Property.findByPk(id)

  if (!property) {
    const info = {
      error: true,
      data: {},
    };
    return res.json(info);
  }

  // validando el mensaje
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const errData = {
      title: "Mensaje invalido",
      subtitle: "",
      color: "error",
      boolean: true,
      send: false
    };
    return res.json(errData);
  }


  // Almacenar mensaje en base de datos
  const {message} = req.body;
  const {id: propertyId} = req.params;
  const {id: userId} = req.user
  await Message.create({
    message,
    propertyId,
    userId
  })

  const successData = {
    title: "Mensaje enviado",
    subtitle: "",
    color: "success",
    boolean: false,
    send: true
  };
  return res.json(successData);

  
}

const showMessages = async (req, res) => {
  const { id } = req.params
  const property = await Property.findOne({
    where: {id},
    include: [
      {
        model: Message, as: 'messages',
        include: [{ model: User.scope('deleteAttributes'), as: 'user'}]
      }
    ],
    order: [
      ['createdAt', 'DESC']
    ]
  })

  // validar si la propiedad existe
  if(!property) return


   // validacion del usuario
  if(property.userId.toString() !== req.user?.id.toString()) return
  
  const messages = property.messages
  
  return res.json(messages)


}

export { dashboard, property, publicModels, sendMessage, showMessages };
