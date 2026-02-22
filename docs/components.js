const {validCategories, validSizes} = require("../models/Product.js");

module.exports = {
    components: {
        schemas: {
            _id: {
                type: "ObjectId",
                description: "Identificador de producto",
                examples: "697a447b3f34a33e0eb655ed"
            },
            category: {
                type: "string",
                description: "Categoría del producto.",
                enum: validCategories,
                examples: "Camisetas"
            },
            Product: {
                type: "object",
                properties: {
                    _id: {
                        $ref: "#/components/schemas/_id"
                    },
                    name: {
                        type: "string",
                        description: "Nombre único del producto.",
                        minLength: 2,
                        maxLength: 150,
                        examples: "Camiseta Balenciaga"
                    },
                    description: {
                        type: "string",
                        description: "Texto descriptivo del producto.",
                        minLength: 0,
                        maxLength: 500,
                        examples: "Camiseta de manga corta. Último diseño presentado por Balenciaga."
                    },
                    image: {
                        type: "string",
                        description: "URL de la imagen del producto.",
                        minLength: 0,
                        maxLength: 500,
                        examples: "https://res.cloudinary.com/dusplgqwl/image/upload/v1771685189/trouser_b72b4b.jpg"
                    },
                    category: {
                        $ref: "#/components/schemas/category"
                    },
                    size: {
                        type: "string",
                        description: "Talla del producto.",
                        enum: validSizes,
                        examples: "S"
                    },
                    price: {
                        type: "number",
                        description: "Precio del producto.",
                        min: 0.0,
                        max: 100000.0,
                        examples: 45.10
                    }
                },
                required: ["name", "description", "image", "category", "size", "price"]
            },
            User: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        description: "Nombre de usuario administrador.",
                        examples: "admin1234"
                    },
                    password: {
                        type: "string",
                        description: "Contraseña de usuario administrador.",
                        examples: "1201dmd8="
                    }
                },
                required: ["username", "password"]
            }
        }
    }
};