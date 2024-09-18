const express = require('express');
const app = express();
const sequelize = require('./database/connection');
const ErrorHandler = require('./middlewares/ErrorHandler');
const customError = require('./utils/customError');
const cors = require('cors');

//auth routes
const sellerAuthRouter = require('./routes/auth/seller.auth.router');
const userAuthRouter = require('./routes/auth/user.auth.router');

//seller routes
const sellerProfileRouter = require('./routes/sellers/profile/seller.router');
const sellerProductsRouter = require('./routes/sellers/products/products.router');
const sellerOrdersRouter = require('./routes/sellers/orders/orders.router');
const sellerOrdersProducts = require('./routes/sellers/orders_products/ordersProducts.router');

//user routes
const userProfileRouter = require('./routes/users/profile/users.router');
const userOrderRouter = require('./routes/users/order/order.router');
const userAddressRouter = require('./routes/users/address/address.router');

//public routed
const publicProductsRouter = require('./routes/public/products.router');
const publicUsersRouter = require('./routes/public/users.router');

//middlewarres
const sellerAuthMiddleWare = require('./middlewares/sellerAuthMiddleWare');
const userAuthMiddleWare = require('./middlewares/userAuthMiddleWare');

//configurations and global middlewares
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get(`/${process.env.SERVER_API_VERSION_1}`, async (req, res, next) => {
  try {
    res.status(200).json({
      msg: 'Server Running Successfuly',
      status: 200
    });
  } catch (error) {
    return next(customError(error, 500));
  }
});

//auth
app.use(`/${process.env.SERVER_API_VERSION_1}/seller`, sellerAuthRouter);
app.use(`/${process.env.SERVER_API_VERSION_1}/user`, userAuthRouter);

//seller
app.use(
  `/${process.env.SERVER_API_VERSION_1}/seller/profile`,
  sellerAuthMiddleWare,
  sellerProfileRouter
);
app.use(
  `/${process.env.SERVER_API_VERSION_1}/seller/products`,
  sellerAuthMiddleWare,
  sellerProductsRouter
);
app.use(
  `/${process.env.SERVER_API_VERSION_1}/seller/order`,
  sellerAuthMiddleWare,
  sellerOrdersRouter
);
app.use(
  `/${process.env.SERVER_API_VERSION_1}/seller/orders-products`,
  sellerAuthMiddleWare,
  sellerOrdersProducts
);

//user
app.use(
  `/${process.env.SERVER_API_VERSION_1}/user/profile`,
  userAuthMiddleWare,
  userProfileRouter
);
app.use(
  `/${process.env.SERVER_API_VERSION_1}/user/order`,
  userAuthMiddleWare,
  userOrderRouter
);
app.use(
  `/${process.env.SERVER_API_VERSION_1}/user/address`,
  userAuthMiddleWare,
  userAddressRouter
);

//public
app.use(
  `/${process.env.SERVER_API_VERSION_1}/public/products`,
  publicProductsRouter
);
app.use(`/${process.env.SERVER_API_VERSION_1}/public/users`, publicUsersRouter);

app.use('*', (req, res, next) => {
  const error = new Error();
  error.message = `Cound't access ${req.originalUrl}`;
  return next(customError(error, 404));
});

//express global error handler
app.use(ErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log('connecting to database...');
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('database connection established.');
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server listen on http://localhost:${process.env.SERVER_PORT}/${process.env.SERVER_API_VERSION_1}`
      );
    });
  });
