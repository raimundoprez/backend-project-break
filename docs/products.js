module.exports = {
    paths: {
        [process.env.API_URL + process.env.PRODUCTS_URL]: {
            get: {
                tags: ["Products"],
                description: "Obtener todos los productos en general o de una categoría específica",
                operationId: "getProducts",
                parameters: [
                    {
                        name: "category",
                        in: "query",
                        description: "Categoría del producto",
                        schema: {
                            $ref: "#/components/schemas/category"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Productos obtenidos con éxito"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            },
            post: {
                tags: ["Products"],
                description: "Crear un producto",
                operationId: "createProduct",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Producto creado con éxito"
                    },
                    400: {
                        description: "Parámetros incorrectos"
                    },
                    401: {
                        description: "Acceso no autorizado"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            }
        },
        [process.env.API_URL + process.env.PRODUCTS_URL + "/{productId}"]: {
            get: {
                tags: ["Products"],
                description: "Obtener un producto por ID",
                operationId: "getProductById",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        description: "ID del producto",
                        schema: {
                            $ref: "#/components/schemas/_id"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Producto obtenido con éxito"
                    },
                    404: {
                        description: "Producto no encontrado"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            },
            put: {
                tags: ["Products"],
                description: "Actualiza un producto",
                operationId: "updateProduct",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        description: "ID del producto",
                        schema: {
                            $ref: "#/components/schemas/_id"
                        }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Producto actualizado con éxito"
                    },
                    400: {
                        description: "Parámetros incorrectos"
                    },
                    401: {
                        description: "Acceso no autorizado"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            },
            delete: {
                tags: ["Products"],
                description: "Borra un producto",
                operationId: "deleteProduct",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        description: "ID del producto",
                        schema: {
                            $ref: "#/components/schemas/_id"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Producto borrado con éxito"
                    },
                    401: {
                        description: "Acceso no autorizado"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            }
        },
        [process.env.API_URL + process.env.AUTH_URL]: {
            post: {
                tags: ["Auth"],
                description: "Loguea a un usuario como administrador",
                operationId: "loginUser",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login exitoso"
                    },
                    400: {
                        description: "Usuario o contraseña incorrectos"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            },
            get: {
                tags: ["Auth"],
                description: "Desloguea a un usuario como administrador",
                operationId: "logoutUser",
                parameters: [],
                responses: {
                    200: {
                        description: "Deslogueo realizado con éxito"
                    },
                    500: {
                        description: "Error de servidor"
                    }
                }
            }
        }
    }
};