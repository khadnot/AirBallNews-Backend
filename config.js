// Shared configuration file for app

export const SECRET_KEY = process.env.SECRET_KEY || 'CH1LD1$HG4MB1N0';

export const PORT = +process.env.PORT || 3001;

export const BCRYPT_WORK_FACTOR = 12;

export const DB_URI = process.env.DB_URI