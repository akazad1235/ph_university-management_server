import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Test app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handling unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  if (server) {
    server.close(() => {
      console.log('Shutting down server...', reason);
      process.exit(1); // Exit with failure code
    });
  }
});

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception azad:');
  process.exit(1); // Exit process on uncaught exception
});
