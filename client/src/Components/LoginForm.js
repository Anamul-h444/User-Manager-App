import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {LoginRequest} from '../apiServices/Api-services'
import { Toaster } from "react-hot-toast";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid Format").required("Required"),
    password: yup.string().required("Required!"),
  });
  const onSubmit = (values, onSubmitProps) => {
    //console.log("From Login Form", values);
    let email = values.email;
    let password = values.password;
    LoginRequest(email, password).then((result)=>{
      if(result===true){
        setTimeout(()=>{
          window.location.href="/"
        }, 1000)
      }
    })

    onSubmitProps.resetForm();
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div>
              <Field
                name="email"
                type="email"
                placeholder="User Email"
                className="border-2 rounded-md px-2 py-2"
              />
            </div>
            <ErrorMessage name="email">
                {(props) => <div className="text-red-700">{props}</div>}
            </ErrorMessage>
            
            <br />

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="border-2 rounded-md px-2 py-2"
              />
            </div>
            <ErrorMessage name="password" />
            <br />
            <button
              type="submit"
              disabled={!formik.isValid}
              className="border bg-purple-500 px-2 py-2 rounded-md text-white"
            >
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
    <Toaster />
    </div>
  );
}

export default LoginForm;
