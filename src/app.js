const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  console.log(request.params.id);
  
  const index = repositories.findIndex( repo => repo.id == request.params.id);
  if(index < 0) {
    return response.status(400).json({
      error: 'Repository not found.'
    })
  }

  const { title, url, techs} = request.body;
  repositories[index].title = title;
  repositories[index].url = url;
  repositories[index].techs = techs;
  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const index = repositories.findIndex( repo => repo.id == request.params.id);
  if(index < 0) {
    return response.status(400).json({
      error: 'Respository not found.'
    })
  }
  repositories.splice(index, 1);
  response.status(204).json({});
});

app.post("/repositories/:id/like", (request, response) => {
  const index = repositories.findIndex( repo => repo.id == request.params.id);
  if(index < 0) {
    return response.status(400).json({
      error: 'Respository not found.'
    })
  }
  repositories[index].likes = repositories[index].likes + 1;
  return response.json(repositories[index]);
});

module.exports = app;
