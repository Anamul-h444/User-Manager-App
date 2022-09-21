# Documentation of Boiler Plate

- src

  - apiServices
  - assets
    - css
    - images
  - components
    - showLoader
      - FullScreen Loader
      - LazyLoader
    - Different component
  - helperClass
    - FormHelper
    - sessionHelper
    - toaster
    - deleteAlert
    - updateAlert
  - pages
  - pagesRouter
  - redux
    - slice-state
    - store
  - App.js
  - index.js
  - index.css

  # Install Required libray

- Create React App -> npx create-react-app my-app
- React-router-dom -> npm install react-router-dom@6
- React-bootstrap -> npm install react-bootstrap bootstrap
- React-icon -> npm install react-icons --save
- React-Redux -> npm i react-redux
- Redux-toolkit -> npm install @reduxjs/toolkit
- axios -> npm i axios
- react-hot-toast -> npm i react-hot-toast
- react-toastify -> npm i react-toastify
- sweetalert2 -> npm i sweetalert2

# How to use React-icon

- npm install react-icons --save
- Go to the url for use icon: https://react-icons.github.io/react-icons/
- search icon for searchbar and click for copy icon name.
- import icon as -> import { FaBeer } from 'react-icons/fa';
- use icon as -> `<FaBeer /> `  
  Note: when import Any item name's first two characters use as 'react-icons/two characters name here. ('react-icons/fa')

# How to use React-bootstrap

- npm install react-bootstrap bootstrap
- Pest the link in google and save file: https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css
- From download (File Name bootstrap.min.css) pest the file in assest/css.
- import the file as import './src/assets/css/bootstrap.min.css. (In index.js)

# How to use Google font in React tailwind

- Go to the link: https://fonts.google.com/
- Search font and select font weight by + button.
- Copy import link with font weight and pest src/index.css(At upper position)
- in tailwind.config file write fontFamily as ` fontFamily: { poppins: ["Poppins", "sans-serif"], }`

# How to use Fevicon

- Create a Logo png Formet.
- Search google as Online favicon generator.
- Logo Drug and Drop.
- Convert Png to Ico
- Download.
- From Zip File copy favicon.ico
- pest in pulic.

# How to use image in React

import Anamul from '../assets/images/Anamul.jpg'  
`<img src={[Anamul]}></img>`

# How to use tailwind css

Terminal

```
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

Config.js

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```
npm run start
```

# How to use react-router

## App.js

```js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./Pages/NavigationBar";
import MyRoute from "./Pages/MyRoute";

function App() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <MyRoute />
      </Router>
    </div>
  );
}
export default App;
```

## MyRoute.js

```js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import NoMatchRoute from "../body/NoMatchRoute";

function MyRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NoMatchRoute />} />
    </Routes>
  );
}
export default MyRoute;
```

## NabigationBar.js (or Link any nav)

```js
import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="profile">Profile</Link>
    </div>
  );
}
export default NavigationBar;
```

## Use Navigate

```js
import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h5>Payment Successful!</h5>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Go Back
      </button>
    </div>
  );
};
export default Payment;
```

# Show lazy loader

- যখন কোন পেইজ লোড হবে তখন লোডার প্রদর্শনের জন্য ইহা ব্যবহার করা হয়।
- SVG Format loader source: https://loading.io/

## LazyLoader.js

```js
import React from "react";
import "../../assets/css/progress.css";
import loaderImg from "../../assets/images/Infinity-1s-200px.svg";

const LazyLoader = () => {
  return (
    <div className="ProcessingDiv">
      <div className="center-screen">
        <img className="loader" src={loaderImg} />
      </div>
    </div>
  );
};

export default LazyLoader;
```

## progress.css

```css
.ProcessingDiv {
  top: 0 !important;
  bottom: 0 !important;
  width: 100%;
  height: 100vh;
  background: transparent;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10000 !important;
}
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 85vh;
}

.loader {
  width: 180px;
}
```

## System of use in page

```js
import React, { Fragment, lazy, Suspense } from "react";
import MasterLayout from "../Components/MasterLayout";
import LazyLoader from "../Components/ShowLoader/LazyLoader";
const ItemOne = lazy(() => import("../Components/ItemOne"));

const ItemOnePage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ItemOne />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};
export default ItemOnePage;
```

# By Redux Maintain Full Screen loader

- বেকএন্ড থেকে ডাটা লোড হওয়ার সময় বা বেকএন্ড এ ডাটা পাঠানোর সময় লোডার প্রদর্শিত করা হয়।

## Explain loaderSlice/reducers:

১. ইনিশিয়ালি লোডার এর ডিসপ্লে হাইড থাকবে। d-noneহল বুটস্ট্যাপ এর ক্লাস।  
২. showLoader এর মাধ্যমে লোডার সো হবে এবং hideLoader এর মাধ্যমে লোডার হাইড হবে।

## Explain FullScreenLoader:

১. useSelector এর মাধ্যমে স্টোর থেকে loader কে ধরে কন্টেইনার ক্লাসের সাথে তাহাকে কনকেটিনেট করে দেয়া হয়েছে। ফলে রিডিউসার থেকে যখন স্ট্যাট আপডেট হয়ে স্টোরে যা আসবে তা এই ক্লাসে আসবে এবং সে অনুযায়ী লোডার সো এবং হাইড হবে।

## Explain Api-Services:

১. showLoader, hideLoader,store কে ইমপোর্ট করা হয়েছে তাদের মধ্যে store থেকে এ্যাকশন ডিসপাচ করার জন্য।  
২. ডাটা সাবমিটেড হওয়ার আগ পর্যন্ত লোডার সো হবে।  
৩. রেসপন্স আসার পূবে লোডার হাইড হবে।  
৪. ক্যাচ ব্লক থেকে ইরর রেসপন্স আসার আগেই লোডার হাইড হবে।

Action dispatch form Api-Services -> Rev action loaderSlice/reducers and update state -> update state rcv store -> by useSelector rcv update in FullScreenLoader and finally display or not.

## FullScreenLoader.js

```js
import React, { Fragment } from "react";
import "../../assets/css/progress.css";
import loaderImg from "../../assets/images/Infinity-1s-200px.svg";
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const loader = useSelector((state) => state.progress.loader);
  return (
    <Fragment>
      <div className={loader + " ProcessingDiv"}>
        <div className="center-screen">
          <img className="loader" src={loaderImg} />
        </div>
      </div>
    </Fragment>
  );
};
export default FullScreenLoader;
```

## Api Services

```js
export function LoginRequest(email, password) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/loginUser";
  let PostBody = { email: email, password: password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        console.log(res.data.token);
        setToken(res.data.token);
        setUserDetail(res.data["data"]);
        successsToast("Login Success");
        return true;
      } else {
        errorToast("Invalid Email or Password");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something Went Wrong");
      store.dispatch(hideLoader());
      return false;
    });
}
```

# How to use toaster (react-hot-toast)

- npm i react-hot-toast

## Create toaster helper class

```js
import toast from "react-hot-toast";

class ToastHelper {
  SuccessToast(param) {
    return toast.success(param);
  }
  ErrorToast(param) {
    return toast.error(param);
  }
}
export const { SuccessToast, ErrorToast } = new ToastHelper();
```

## Use in component

```js
import React from "react";
import { SuccessToast, ErrorToast } from "../helperClass/toaster";
import { Toaster } from "react-hot-toast";

function ItemOne() {
  return (
    <div>
      <button
        className="bg-purple-700 px-4 py-3 text-white rounded-md"
        onClick={() => SuccessToast("Suuccess Toast")}
      >
        Click for check Success toaster
      </button>
      <button
        className="bg-red-600 px-4 py-3 ml-4 text-white rounded-md"
        onClick={() => ErrorToast("Error Toast")}
      >
        Click for check Error toaster
      </button>
      <Toaster />
    </div>
  );
}
export default ItemOne;
```

# How to use toaster (react-toastify)

## Create toaster helper class

```js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class FormHelper {
  successsToast(msg, msg2) {
    var msg2 = { position: toast.POSITION.BOTTOM_LEFT };
    return toast.success(msg, msg2);
  }

  errorToast(msg, msg2) {
    var msg2 = { position: toast.POSITION.BOTTOM_LEFT };
    return toast.error(msg, msg2);
  }
}
export const { successsToast, errorToast } = new FormHelper();
```
## Use in component
```js
import { ToastContainer } from 'react-toastify';

<div> 
returen
<ToastContainer />
</div>
```
# helper class এর মাধ্যমে ফরমকে ভেলিডেশন প্রদান করার নিয়মঃ
১. একটি নাম দিয়ে ক্লাস তৈরী করতে হবে।  
২. ক্লাসের ভিতরে সাইনআপ ফরমের ধরন অনুযায়ী নাম দিয়ে হেল্পার তৈরী করতে হবে।  

isEmpty:  
-> সে value তে সাইনআপ ফরমের firstName, lastName, password রিসিভ করবে।    
-> সে value এর লেংথ যাচাই করবে। যদি value এর লেংথ ০ হয় তাহলে সে True রিটার্ণ করবে। আর যদি লেংথ ০ না হয় তাহলে সে False রিটার্ণ করবে।  

isEmail:  
-> সে value তে সাইনআপ ফরমের email রিসিভ করবে।    
-> উক্ত email কে test করে দেখবে MobileRegx এর সাথে মিলে কিনা। যদি মিলে তাহলে সে True রিটার্ণ করবে। আর যদি না মিলে তাহলে সে False রিটার্ণ করবে।  
নোটঃ যেহেতু MobileRegx এর আগে নট রয়েছে সুতরাং যদি না মিলে তাহলে True রিটার্ণ করবে। আর যদি মিলে যায় তাহলে False রিটার্ণ করবে।  
