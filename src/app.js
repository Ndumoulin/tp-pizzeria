import express from 'express';

import database from './helpers/database.js';
import errors from './helpers/errors.js';

import pizzeriasRoutes from './routes/pizzeriasRoutes.js';
import customersRoutes from './routes/customersRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

const app = express();

database(app);

app.use(express.json());

app.get('/', (req, res, next) => {
    console.log('First route');
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send('<html><strong>First Route</strong></html>');
});

app.use('/pizzerias', pizzeriasRoutes);
app.use('/customers', customersRoutes);
app.use('/orders', ordersRoutes);

app.use('*', errors);

export default app;
