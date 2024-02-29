# Frontend
Typescript/React frontend, copy .env.example vars in .env file (you should create it) and ask me (or check email) how to fill it.

## Structure
In the main folder you will find all the configurations/requirements files, eslint configuration, jest and cypress config for tests, (etc.) your main focus should be on the src folder.

### Src
In the [types](./src/types.ts) file you will find basically every type of the FE application, this file is divided in 3 main section and an Utils section.
- Forms: React-Hook-Forms form interfaces stores the interfaces of the forms handled by react-hook-form
- API: Contain DTO & BODY types that are needed for API comunication
- Redux: Redux State Store contain types of the redux store
- Utils: Types used for utils

### Controllers, Components

With **Controllers** i mean a React components with the main functionality of praparing the data for the **Components**, and handling their states.

**main controllers**
- [Router](./src/Controllers/Router.tsx) controls the login/logout state and redirect the user to the correct component of the Single page Application.
- [Home](./src/Components/Home.tsx) is a container for the 2 main React components of the application:
  - [LeftMenu](./src/Controllers/LeftMenu.tsx) that controls the states of the application that are rendered by the Main Page.
  - [MainPage](./src/Components/MainPage.tsx) The main page of this single page application that can renders one of these five **Controllers**: Players, Teams, Matches, Stats, User.
- [Error](./src/Controllers/Error.tsx) Used as an ErrorBoundary this **Controller** catches every unhandled error and "tries" to gracefully handle it, i usually like to use this approach because i can centralize the log, and i can be sure to log every error (with the implemented logger), this approach gives, to the user, the impression that every errror is handled by the application, and that he can always safetely move back to home/login page. This **Controller** renders [Error Component](./src/Components/Error.tsx) that is used to render handled/catched Exception too (same UI/UX).

**data controllers**
- [Players](./src/Controllers/Players.tsx) Renders the [Table](./src/Controllers/CustomTable.tsx) of Players and the buttons to have the CRUD operations on players data, to edit/delete a player (or browse its stats) you need to select its checkbox in the table.
- [Teams](./src/Controllers/Teams.tsx) Renders the [Table](./src/Controllers/CustomTable.tsx) of Teams and the buttons to have the CRUD operations on teams data, to edit/delete a team (or browse its stats) you need to select its checkbox in the table.
- [Matches](./src/Controllers/Matches.tsx) Renders the list of matches, divided per status (ongoing, preparing, ended). Only one match can be in ongoing mode and this match is the only one that can be updated (and browsed) Live. In this page the live matches will be updated live with SSE notifications.
- [Stats](./src/Controllers/Stats.tsx) Renders the stats for team and players (strikers and defenders) via a simple select and a [Table](./src/Controllers/CustomTable.tsx).
- [LiveMatch](./src/Controllers/LiveMatch.tsx) Renders the live Match page, the live match will be updated live with SSE notifications.

**data controllers (extra)**
- [Player](./src/Controllers/Player.tsx) This page shows the Player Page, where you can browse the player Stats.
- [Team](./src/Controllers/Team.tsx) This page shows the Team Page, where you can browse team Stats and the team matches.
- [User](./src/Controllers/User.tsx) This page shows the user page. *Updated in next release* :This page will store user favourite team color defining the mui palette.

**shared components**
- [Image Layout](./src/Components/ImageLayout.tsx) used to render logo, error pages, and basically every images you want to add.
- [Custom Table](./src/Controllers/CustomTable.tsx) used to render data in a table, before calling this component you should use an util function to extract and normalize the data you want to display in columns and rows that can be read by this component. One table multiple uses.
- [Custom Text Modal](./src/Components/CustomTextModal.tsx.tsx) and [Custom Option Modal](./src/Components/CustomOptionsModal.tsx) paired with [Confirmation Dialog](./src/Components/ConfirmationDialog.tsx) used to render all the form fields for CRUD operations on App data, every form component it's used with different kind of data.

### Hooks
Custom hooks of the webapp
  - [FE Logger](./src/Hooks/Logger.tsx) implementation, the dev implementation with console.info, console.error can be extended with the desired prod Logger
  - [SSE notification](./src/Hooks/useMatchNotifications.ts.tsx) to intercept BE SSE events and notify the user. When the user visit Match page (or any live match page) a SSE network connection will be opened, this connection is similar to a websocket but in SSE the BE is the only one with the ability to send a message in this stream. When this hook intercepts the message type 'goalScored' this will add a text notification and a goal. The goal will be added to the team only it the id sent in the SSE stream is correct, the text message will be shown anyway.

### Store

[Here](./src/Store/index.ts) is a setup and export the redux store, handle load/save state to local storage.

- [player](./src/Store/player.ts) here we handle the selectors, reducers and thunks of the player store, handles player list (for player list table), player (player page) status (status is meant to render loader, error page or desired component). When a CRUD operation is performed playerList will be updated accordingly, player prop will update when a user browse the player page (data only in read mode).
- [team](./src/Store/team.ts) here we handle the selectors, reducers and thunks of the team store, handles team list (for team list table), team (team page) status (status is meant to render loader, error page or desired component). When a CRUD operation is performed teamList will be updated accordingly, team prop will update when a user browse the team page (data only in read mode).
- [match](./src/Store/match.ts) here we handle the selectors, reducers and thunks of the match store, handles match list, and status (status is meant to render loader, error page or desired component). When a CRUD operation is performed matchList will be updated accordingly. For Live match page i didn't added another property "ex. match" because SSE event will update the matchList prop directly.
- [stats](./src/Store/stats.ts) here we handle the selectors, reducers and thunks of the stats store, that contains the 3 requested statistics: team rankings, strikers and defenders.
- [users](./src/Store/users.ts) here we handle the selectors, reducers and thunks of the users store, that contains mainly user email and token.
- [util](./src/Store/util.ts) here we handle the selectors, reducers and thunks of the util store, that contains mainly the status of the user selection (from LeftMenu).
- [sse](./src/Store/sse.ts) is where we handle sse match messages shown on Matches and Live Match component.

### Utils
In this folder you can find:
- [f](./src/Utils/f.ts) general utility function and [project tested utils](./src/Utils/f.test.ts).
- [ls](./src/Utils/ls.ts) handles the local storage interaction and its encrypt/decrypt.
- [store](./src/Utils/store.ts.ts) where i handle loading/saving state on page/reload and the initial state of the whole redux store.
- [config](./src/Utils/config.ts) environment variables loading from [env](./.env.example) file.

### Api
Is where I created an axios instance and implemented all the frontend API calls to node backend.

### Cypress
Utils to support cypress tests suite.

### Translations
The it and en files represent the i18n for these languages, with the [Language Selector](./src/Controllers/LanguageSelector.tsx) Controller you can switch between italian and english.

### Images
Is where the images/logos are stored


## Tests
To run the cypress automated tests, you need to open a terminal in the frontend folder and run the command:
```bash
yarn run cypress open
```
This will open the cypress integrated browser and you will see 2 options:
- E2E Testing
- Component Testing

You can browse both options and run the tests i added.
[loom video](https://www.loom.com/share/564faeb98c8544adb9707b0ef753ba44)