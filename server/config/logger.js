import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf(({ timestamp, level, message, service }) => {
      return `${timestamp} [${service || "no-class"}] ${level}: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export const createLogger = (service) => logger.child({ service })