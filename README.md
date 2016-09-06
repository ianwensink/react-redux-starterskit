# Stageverslag-0901291

Find a demo of this app <a href="https://stageverslag-0901291.herokuapp.com" target="_blank">right here</a>.

Stageverslag-0901291 is an isomorphic web-app in ReactJS with the power of Redux behind it. With this app you can manage your internship. You can manage which achievements you can accomplish during this internship and what your status is per achievement. You can add blog items to simply show some text, and overview pages to list a certain type on (achievements, logs or pages).

## Features
- Manage (add/edit/delete) pages and your app's header
- Manage (add/edit/delete) achievements with a state (to do/in progress/done)
- Manage (add/edit/delete) log items to blog about your days at the company
- Add references of pages and log items to your achievement to show where you worked on achieving the achievement.
- Toggle logged in state to see what your app looks like when you're not logged in
- Default data is already added, but can all be deleted. The entire portfolio is stored in your browser's localStorage, so none of your data is visible to the outside world.
- The project is using the ES6/ES2015 syntax for JavaScript and transpiling the code back to ES5 using BabelJS with Webpack. The project is managed with NPM.
- Server side rendering is built in into the application to serve crawlers such as Google and offer basic support to people browsing without JavaScript enabled. Please note that data you add or edit in the application, is not rendered on the server because of it being in your browser's storage. Only default data is visible server side.
- Styling is done through SASS.
- Heroku support is already built in to make it as easy as possible to launch your app into the world wide web.
- Filter achievements on the overview page based on status (to do, in progress, done) or type

## Usage
1. Clone the repo.
2. `cd` into the repo and `npm install`.
3. For local use, run `npm start` on the repo folder and visit `http://localhost:5000` to see your app.
4. For production use, you can push the repo to a service like Heroku. Heroku support is already built in in this repo.

## README for school
### Explaination (requirements)
- *The app should be cool*
  - This app is cool, because now I can manage my internship at Burst and during the internship I can develop some more on this application. Nice as well is the link between an achievement and references. I heard it could be hard to keep track of all of your progress during your internship, so this system could simplify that.
- *The app should give the student enough profundity*
  - It did, because the link I mentioned before was tricky. Also the use of Redux with ReactJS was, tho a good choice, really tough to come by. It was really hard to grasp the data flow that Redux uses. When building the ManagePage component, the flow came to me. The server side rendering was hard as well. In the end it was worth it, but it forces you to constantly take into account that the server is no browser. Profundity is also seen in the genericity of some Components. For instance, the Page component, renders an OverviewList component based on what kind of page it is, just passes the data, and the List component does the rest.
- *The app uses at least 3 objects, of which 1 has an extend relationship*
  - In spite of models not really being a thing in React, I made really good use of them. I used models as default values for my data, for when no data was found or data has yet to be fetched from the server/storage. Also extending objects or models is not of any use in React, but React Components do extend from the React.Component, and Child Components use a lot of data of their parent ones. <br>
  Models I used are to be found in the /src/models folder, e.g. achievementModel.js.
- *It makes sense to use a MV\* pattern with this app*
  - It totally does, due to the different views and data coming together on various routes.
- *Multiple events are needed to make the app work*
  - Because React uses an application state, and every component can have a state as well, events are very much needed to control the data flow. In forms, for instance, every field has an onChange listener, so when the field value changes, the component state gets updated on the fly. When the form gets submitted, another event is triggered to edit the application state.
- *It makes sense to use ES2015 with the app*
  - Because of the Component Classes, the spread operator, the Object.assign(), the Promises, destructering objects, and many more the app's source code is really neat and clean and can be maintained easely in the future.

### Testing browsersupport (screenshots)

#### IE 11
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3Y0lQVlpQRVYxU00/view?usp=sharing">Pages (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3S0ZmSzFfWndOVWs/view?usp=sharing">Pages (logged out)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3V2R0RWtwaVkyaFE/view?usp=sharing">Add achievement (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3TGlHX0ZQcC1hNzg/view?usp=sharing">Edit achievement (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3aHlHUV9NeFl4eWc/view?usp=sharing">Achievements with filter (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3OE1GRGZ5OEIyREE/view?usp=sharing">Achievement detail page (logged in)</a>

#### Chrome 52
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3TGRsWDdKSUtrMjg/view?usp=sharing">Pages (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3MHY5RlgwdmZlUGc/view?usp=sharing">Pages (logged out)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3dWdlQ2lWckpCdE0/view?usp=sharing">Add achievement (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3N3VyMERKLTJmU0k/view?usp=sharing">Edit achievement (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3WVduNnNxcUx4ZHM/view?usp=sharing">Achievements with filter (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3RGVDV25PQWRNYnM/view?usp=sharing">Achievement detail page (logged in)</a>

#### Firefox 48
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3YjQ1a1NfbFFNWXc/view?usp=sharing">Pages (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3aDFMNTVsLUx6eFE/view?usp=sharing">Pages (logged out)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3bG05ZzZYdFlJRWs/view?usp=sharing">Add achievement (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3NW0yZEpYY3JJUFE/view?usp=sharing">Edit achievement (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3bm9jT3ZfU0hHQW8/view?usp=sharing">Achievements with filter (logged in)</a>
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3bmRWTklzcjI0bzg/view?usp=sharing">Achievement detail page (logged in)</a>

#### JS Disabled
- <a href="https://drive.google.com/file/d/0B4ZATWdHNFp3Q3JNaUVDSU9xTFE/view?usp=sharing">Achievement overview without JavaScript (logged in)</a>

## Troubleshooting
#### *"I lost the ability to add pages because I removed the pages page"*
 Don't worry. When you delete the /pages page, just go to /pages/add and add a new page with Page Type `Overview page` and Overview Type `Pages`. If you name this page `Pages` a new overview page will be visible again at /pages. Note that this page should be in the navigation, but not accessible. You could always just run `localStorage.clear()` inside your browser's console to reset the entire application to default data.
#### *"I lost the ability to create or add anything"*
Just click on the `You are currently logged in` button in the upper right of the page to toggle your logged in state. Once you are 'logged in', you can create and edit again.

