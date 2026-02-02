const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');
const { initFirebase } = require('./config/firebase');
const { initCloudinary } = require('./config/cloudinary');
const { errorHandler } = require('./middleware/error');

const authRoutes = require('./routes/auth.routes');
const menuRoutes = require('./routes/menu.routes');
const bookingRoutes = require('./routes/booking.routes');
const orderRoutes = require('./routes/order.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const telegramRoutes = require('./routes/telegram.routes');
const settingsRoutes = require('./routes/settings.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api', limiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', name: 'BUKHARAREST API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/telegram', telegramRoutes);
app.use('/api/settings', settingsRoutes);

app.use(errorHandler);

const start = async () => {
  await connectDb();
  initFirebase();
  initCloudinary();
  app.listen(PORT, () => {
    console.log(`API running on ${PORT}`);
  });
};

start();

module.exports = app;
