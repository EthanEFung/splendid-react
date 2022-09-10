# Splendid

This is a personal project, to build a game inspired by but not affiliated with Marc Andre's Splendor. Take with a grain of salt (given that I am a solo developer) that the code is experimental, so use / develop with discretion.

My end goal is to learn a little more about Golang, and focus on backend work. However, there needs to be a nice interface that can be shown to non-technical people, and so having a client for my backend is necessary. Building a web application imo is the obvious choice.

I've chosen React over much better and simpler javascript frameworks because it is the framework I am most familiar with.

# Todos and Outstanding Issues that need to be solved

- set up react query
- Setting up authentication: this is necessary given the application will be hosted on the internet, and as much as we can, we want to have means for two sessions to interact in a single game.
- How do we communicate to the client what connections are in game
- We should limit the connections of people who can visit a game

# Backend related tangents

- Another problem we would probably run into is howw to host a website in a sustainable way. This would rely on some sort of instrumentation or analytics to let me know whether I can migrate my backend service to something that can be dormant while not in use.
- Another potential is to turn this project into a wasm based, but lets assume this is scope creep.
- If the end goal is golang, and we need real time updates or at least some sort of event based system that our clients can send and receive messages with. Generally on the web, this is done through websockets. The use of technology, can be an issue we solve for in the near future.

# Local development

Assuming that you have recent version of node (16^) and npm, from the terminal run:

```bash
npm run dev
```
