const router = require('express').Router();
const { request } = require('express');
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {model: Category},
        {model: Tag, through: ProductTag}
      ]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product using the product id
router.get('/:id',  async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {model: Category},
        {model: Tag, through: ProductTag}]
    });

    if (!productData) {
      res.status(404).json({ message: 'No products found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
      await Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tag_id: req.body.tagIds
        })
      .then ((product) => {
          // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map
            ((tag_id) => {
              return {
                product_id: product.id,
                tag_id,
            }})
          ProductTag.bulkCreate(productTagIdArr)  
          .then((productTagIds) => {
            product.tags = productTagIds
            res.status(200).json(product)
            return
          })
        } else {
          return res.status(200).json(product)
        }
      }
    )}
    catch (err) { 
      console.log(err);
      res.status(400).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
      const productData = await Product.update({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tag_id: req.body.tagIds
        },{
        where: {
          id: req.params.id,
        }
      })
      .then ((product) =>  {
        // find all associated tags from ProductTag
        return ProductTag.findAll({ where: { product_id: req.params.id } });
      })
      .then((productTags) => {
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id)
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // run both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ])
      })
      .then((updatedProductTags) => res.json(updatedProductTags))
    }
    catch (err) {
      // console.log(err);
      res.status(400).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
try {  
  const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
    // .then((product) => {
    //   // find all associated tags from ProductTag
    //   return ProductTag.findAll({ where: { product_id: req.params.id } });
    // })
    // .then((productTags) => {
    //   // get list of current tag_ids
    //   const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //   // create filtered list of new tag_ids
    //   const newProductTags = req.body.tagIds
    //     .filter((tag_id) => !productTagIds.includes(tag_id))
    //     .map((tag_id) => {
    //       return {
    //         product_id: req.params.id,
    //         tag_id,
    //       };
    //     });
    //   // figure out which ones to remove
    //   const productTagsToRemove = productTags
    //     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //     .map(({ id }) => id);

    //   // run both actions
    //   return Promise.all([
    //     ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //     ProductTag.bulkCreate(newProductTags),
    //   ]);
    // })
    // .then((updatedProductTags) => res.json(updatedProductTags))
    // .catch((err) => {
    //   console.log(err.message);
    //   res.status(400).json(err);
    // })


module.exports = router;
