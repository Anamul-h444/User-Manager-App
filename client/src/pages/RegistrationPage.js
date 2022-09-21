import React, { Fragment, lazy, Suspense } from "react";
import LazyLoader from "../Components/ShowLoader/LazyLoader";
const RegistrationForm = lazy(() => import("../Components/RegistrationForm"));

const RegistrationPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <RegistrationForm />
      </Suspense>
    </Fragment>
  );
};
export default RegistrationPage;
