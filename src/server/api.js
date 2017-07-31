import express from 'express';
import requestify from 'requestify';

const URL_MERCADOLIBRE_API = 'https://api.mercadolibre.com/'


const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Mercado Libre Challenge API!' });
});

apiRoutes.get('/items', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(500).send({
      success: false,
      message: 'No query search provided. Please, try again with parameter (q) on URL'
    });
  }

  const URL_SEARCH_ITEMS = `${URL_MERCADOLIBRE_API}sites/MLA/search?q=${query}`;
  requestify.get(URL_SEARCH_ITEMS).then(function (response) {

    const data = response.getBody();

    const categoriesMapped = data.available_filters
      .find((filter) => {
        return filter.id === 'category';
      })
      .values.map((category) => category.name);

    const itemsMapped = data.results
      .map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.available_quantity,
            decimals: item.price
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          city_name: item.address.city_name
        };
      });

    const responseData = { categories: categoriesMapped, 
                           items: itemsMapped };
    res.json(responseData);
  });
});

apiRoutes.get('/items/:id', (req, res) => {
  var id = req.params.id;

  const URL_ITEM = `${URL_MERCADOLIBRE_API}items/${id}`;
  var requests = [
    requestify.get(URL_ITEM),
    requestify.get(`${URL_ITEM}/description`)
  ];

  Promise.all(requests).then((values) => {
    const item = values[0].getBody();
    const description = values[1].getBody();

    const itemMapped = {
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.available_quantity,
          decimals: item.price
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.text
      }
    };

    res.json(itemMapped);
  });

});

export default apiRoutes;