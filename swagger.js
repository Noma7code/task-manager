const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Task Manager API",
    description: "API documentation for Task Manager",
  },
  host: "localhost:8080",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
