# This is client side React App for www.kidsfuncloud.com

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The theme template is from mui.com

## Available Scripts

In the project directory, you can run:

### `yarn install --ignore-engines`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3600](http://localhost:3600) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Code Introduction

The following is the quick guide on source code files.

### Data model definition

The main two data models are `user` and `club`. Please see their definition in type folder,

**src/types/user.ts**

**src/types/clubinfo.ts**

You can add more attributes or properties to the user or club type, but don't delete any.  


### Some dashboard compoenent source file locations

Side bar source file: 

**src/layouts/DashboardLayout/NavBar/index.tsx**

Top bar of Dashboard source file: 

**src/layouts/DashboardLayout/TopBar/index.tsx**

Routing source file: 

**src/routes.tsx**

### Mock api exmaple
      The notification alert symbol on top right corner currently is using mock api and just dispalying a fake message. 
      1. calling mock api from slice 
      src/slices/notification.ts
      2. the mock data file and mock api 
      src/__mocks__/notifications.ts
      3. the mock api is using  axios's AxiosMockAdapter and creates a mock axios instance 
      src/utils/mock.ts

### Font Note

The font is loaded through CDN. The font used is Roboto Font. Please see index.html,

href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700"
rel="stylesheet"

### Test Account and Authorization Notes 


1. To login,use test account: support@kidsfuncloud.com and password : abc123

2. Authorization is using firebase. See FirebaseAuthContext.tsx. The firebase currently enabled email/password login and google login.
   
The below 3 notes currently are not valid. Token is not used for front-end developement.  
   
1. When user logged in from firebase, firebase client token is sent to backend server for verification and registar user in app server. Server will return our app JWT token for any future communication.
   see src/common/tokenapis.js, tokenverify
  
2. All login will check against our server and regiester/save new users in mongoDB.

3. After tokenverify, user profile data and event data are feteched in case of page refreshing.

Returned JWT token from our api server is saved in redux store for safety reason, NOT in localstorage.

## env file

In the env file, some Firebase API keys and Google Analytic Measurment ID are open to public. This is ok. They can be found in html source code.
