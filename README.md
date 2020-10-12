# Game Of Three
<a href="https://codeclimate.com/github/abdo38013/game-of-three/maintainability"><img src="https://api.codeclimate.com/v1/badges/092611854aabbb6af1b3/maintainability" /></a>

Game of Three is a task for a takeaway company.

## Requirements
- npm
- node > 8
## Installation

Use the package manager [npm](https://npmjs.com) to install game of three.

```sh
npm install && npm start
```

## Usage
- Go to http://localhost:3000/ (Open 2 tabs or 2 browsers)
- A socket connection will be established.
- Enter your name and hit Enter and the game will start (for each tab or browser).
- The Game will start automatically.
- and when the number is equal to 1 you will get the status of who won and who lose based on the turn.

## Notes
- The backend sending a recommendation Add to the frontend.
- The frontend using this recommendation Add and send it back again to the backend to make the game running automatically, to choose your desire Add (should be implemented from the frontend side).
- Each player has a unique Id, so it's okay if there is a 2 players having the same name.

## assumption
Based on my understanding from the requirements:
   - I build the app to support only one game for the current moment.
   - I build the frontend to work in an automatic way using the recommended Add.

## Enhancements 
- Support more than one Game, by saving the game in the Database.
- Handle Connection Lost.
## Testing

```sh
npm run test
```


