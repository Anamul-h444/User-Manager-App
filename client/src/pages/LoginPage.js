import React, { Fragment, lazy, Suspense } from "react";
import LazyLoader from "../Components/ShowLoader/LazyLoader";
const LoginForm = lazy(() => import("../Components/LoginForm"));

const RegistrationPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <LoginForm />
      </Suspense>
    </Fragment>
  );
};
export default RegistrationPage;
