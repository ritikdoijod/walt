import pino from "pino";

export default pino({
  timestamp: () => `,"timestamp":"${new Date().toLocaleString()}"`,
});
