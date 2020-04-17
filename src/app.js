const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const profiles = [];

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}

app.use(logRequests);

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
})

app.get('/profiles', (request, response) => {
    return response.json(profiles)
});

app.post('/profiles', (request, response) => {
    const { name, company, techs } = request.body;

    const profile = { id: uuid(), name, company, techs, likes: 0 };

    profiles.push(profile);

    return response.json(profile);
});

app.put('/profiles/:id', (request, response) => {
    const { id } = request.params;
    const { name, company, techs } = request.body;

    const profileIndex = profiles.findIndex(
        profile => profile.id === id
    );

    if (profileIndex < 0) {
        return response.status(400).json({ error: 'Profile not found.' });
    }

    const profile = {
        id: profiles[profileIndex].id,
        name,
        company,
        techs,
        likes: profiles[profileIndex].likes
    }

    profiles[profileIndex] = profile;

    return response.json(profile);
});

app.delete('/profiles/:id', (request, response) => {
    const { id } = req.params;

    const profileIndex = profiles.findIndex(
        profile => profileIndex === id
    );

    if (profileIndex < 0) {
        return response.status(400).json({ error: 'Profile not found.' });
    }

    profiles.splice(profileIndex, 1);

    return response.status(204).send();
});

app.post("/profiles/:id/like", (request, response) => {
    const { id } = request.params;
  
    const profileIndex = profiles.findIndex(
      profile => profile.id === id
    );
  
    if (profileIndex < 0) {
      return response.status(400).json({ error: "profile not found." });
    }
  
    profile = profiles[profileIndex];
  
    profile.likes++;
  
    return response.json(profile);
  });

module.exports = app;