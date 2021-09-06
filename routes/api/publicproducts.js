const express = require('express');
const router = express.Router();

const {getAll, getById, getByCategory} = require('../../models/product.model')

// paginado de productos //
// GET http://localhost:3000/api/products/?page=2&limit=5

/* aqui le decimos que si no vienen los valores de page y limit, le asigne 1 y 5 respectivamente */
router.get('/', (req, res) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 5;
	// 1 - Recuperar los productos de la BBDD, como nos devuelve una promesa el metodo de la query, tenemos que poner el then y el catch
	// le ponemos parseInt para convertir el string que le pasamos a numero entero //
	getAll(parseInt(page), parseInt(limit))
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.json(err.message);
		});
});

// RECUPERAR PRODUCTOS POR CATEGORIA getByCategory GET http://localhost:3000/api/products/cat/moda

router.get('/cat/:category', async (req, res) => {
	getByCategory(req.params.category)
		.then((result) => res.json(result))
		.catch((error) => res.json({ error: error.message }));
});

//RECUPERAR PRODUCTO POR ID como nos devuelve una promesa, tenemos que hacerlo con ASYNC AWAIT TRY CATCH
// GET http://localhost:3000/api/products/2

router.get('/:productId', async (req, res) => {
	try {
		const result = await getById(req.params.productId);
		if (result) {
			res.json(result);
		} else {
			res.json({ error: 'El producto no existe en la base de datos' });
		}
	} catch (error) {
		res.json({ error: err.message });
	}
});

module.exports = router;
