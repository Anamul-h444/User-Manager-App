import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import{RegistrationRequest} from '../apiServices/Api-services'
import { Toaster } from "react-hot-toast";
import {useNavigate} from 'react-router-dom'


function RegistrationForm() {
let navigate = useNavigate();
    const initialValues = {
        email:'',
        firstName:'',
        lastName:'',
        mobile:'',
        password:''
    };
    const validationSchema = yup.object({
        email:yup.string().email("Invalid Format!").required('Required!'),
        firstName:yup.string().required('Required!'),
        lastName:yup.string().required('Required!'),
        mobile:yup.string().required('Required!'),
        password: yup
         .string()
         .required('Please Enter your password')
         .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),

        
    })
    const onSubmit = (values)=>{
        console.log(values)
   let  email= values.email
   let  firstName= values.firstName
   let  lastName= values.lastName
    let mobile=values.mobile
   let  password=values.password
   let  photo=''
   RegistrationRequest(email,
    firstName,
    lastName,
    mobile,
    password,
    photo).then((result)=>{
      if(result===true){
        setTimeout(()=>{
          navigate('/LoginPage')
         }, 2000)
      }
    })
    }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => {
        return (
          <Form>
            <div>
              <label htmlFor="email">Email</label> <br/>
              <Field type='email' name='email' className='border-2 px-2 py-2 rounded-md' /> <br/>
              <ErrorMessage name="email" />
            </div>

            <div>
              <label htmlFor="firstName">First Name</label> <br/>
              <Field type='text' name='firstName' className='border-2 px-2 py-2 rounded-md' /> <br/>
              <ErrorMessage name="firstName" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label> <br/>
              <Field type='text' name='lastName' className='border-2 px-2 py-2 rounded-md' /> <br/>
              <ErrorMessage name="lastName" />
            </div>

            <div>
              <label htmlFor="mobile">Mobile NO</label> <br/>
              <Field type='text' name='mobile' className='border-2 px-2 py-2 rounded-md' /> <br/>
              <ErrorMessage name="mobile" />
            </div>

            <div>
              <label htmlFor="password">Password</label> <br/>
              <Field type='password' name='password' className='border-2 px-2 py-2 rounded-md' /> <br/>
              <ErrorMessage name="password" />
            </div>

            <button type="submit" className="px-2 py-2 mt-2 text-white bg-purple-900 rounded-md" >Submit</button>
          </Form>
        );
      }}
    </Formik>
    <Toaster />
    </div>
  );
}

export default RegistrationForm;
