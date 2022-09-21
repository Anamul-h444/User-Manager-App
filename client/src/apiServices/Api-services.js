
import axios from "axios";
import { showLoader, hideLoader } from "../redux/slice-state/loaderSlice";
import store from "../redux/store/store";
import {
  setToken,
  getToken,
  setUserDetail,
  setEmail,
  setOTP
} from "../helperClass/sessionHelper";
import { setProfile } from '../redux/slice-state/profileSlice'
import {SuccessToast, ErrorToast} from '../helperClass/toaster'


let BaseURL = "http://localhost:5000/api/v1/";

export function LoginRequest(email, password) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/loginUser";
  let PostBody = { email: email, password: password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
     
      store.dispatch(hideLoader());
      if (res.status === 200) {
        //console.log("From APi res:", res)
        //console.log("From API Token:", res.data.token);
        setToken(res.data.token);
        //console.log('From API Data:',res.data["user"] )
        setUserDetail(res.data["user"]);
        SuccessToast("Login Success");
        return true;
      } else {
        ErrorToast("Invalid Email or Password");
        return false;
      }
    })
    .catch((err) => {
      ErrorToast("Something Went Wrong");
      store.dispatch(hideLoader());
      return false;
    });
}

export function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/regestrationUser";
  let postBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };

  return axios
    .post(URL, postBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          if (res.data["data"]["keyPattern"]["email"] === 1) {
            ErrorToast("Email Already Exist");
            return false;
          } else {
            ErrorToast("Something Went Wrong");
            return false;
          }
        } else {
          SuccessToast("Registration Success");
          return true;
        }
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      ErrorToast("Something went wrong!");
      return false;
    });
}


export function UserProfileRequest() {
  store.dispatch(showLoader());
  let URL = BaseURL + "profileDetails";
  const AxiosHeader = { headers: { token: getToken() } };

  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      console.log("res",res)
      store.dispatch(hideLoader());
      console.log("data", res.data['data'][0])
      store.dispatch(setProfile(res.data["data"][0]));
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      ErrorToast("Something went wrong!");
    });
}

// export function ProfileUpdateRequest(
//   email,
//   firstName,
//   lastName,
//   mobile,
//   password,
//   photo
// ) {
//   store.dispatch(showLoader());

//   let URL = BaseURL + "/updateProfile";
//   const AxiosHeader = { headers: { token: getToken() } };
//   let PostBody = {
//     email: email,
//     firstName: firstName,
//     lastName: lastName,
//     mobile: mobile,
//     password: password,
//     photo: photo,
//   };
//   let UserDetails = {
//     email: email,
//     firstName: firstName,
//     lastName: lastName,
//     mobile: mobile,
//     photo: photo,
//   };

//   return axios
//     .post(URL, PostBody, AxiosHeader)
//     .then((res) => {
//       store.dispatch(hideLoader());
//       if (res.status === 200) {
//         successsToast("Profile Update Success");
//         setUserDetail(UserDetails);
//         return true;
//       } else {
//         errorToast("Something Went Wrong");
//         return false;
//       }
//     })
//     .catch((err) => {
//       errorToast("Something Went Wrong");
//       store.dispatch(hideLoader());
//       return false;
//     });
// }

// /* ........Email Varification and then Send OTP........... */
// export function emailVarificationAndSendOTP(email) {
//   store.dispatch(showLoader());
//   let URL = BaseURL + "/emailVarificationAndSendOTP/" + email;
 
//   return axios
//     .get(URL)
//     .then((res) => {
//       store.dispatch(hideLoader());
//       if (res.status === 200){
//         if(res.data['status']==="fail"){
//           errorToast("No user found");
//           return false;
//       }
//       else{
//           setEmail(email)
//           successsToast("A 6 Digit verification code has been sent to your email address. ");
//           return true;
//       }
//       }else{
//         errorToast("Something Went Wrong");
//          return false;
//       } 
//     })
//     .catch((err) => {
//       errorToast("Something Went Wrong");
//       store.dispatch(hideLoader());
//       return false;
//     });
// }

// export function verifyOtpRequest(email, otp) {
//   store.dispatch(showLoader());
//   let URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + otp;
 
//  return axios.get(URL)
//   .then((res)=>{
//     store.dispatch(hideLoader());
//     if(res.status===200){
//       if(res.data['status']==="fail"){
//         errorToast(res.data['data']);
//         return false;
//     }
//     else{
//         setOTP(otp)
//         successsToast("Code Verification Success");
//         return true;
//     }
//     }else{
//       errorToast("Something Went Wrong");
//       return false; 
//     }

//   })
//   .catch((err)=>{
//     errorToast("Something Went Wrong");
//     store.dispatch(hideLoader());
//     return false;
//   })
// }

// export function RecoverResetPassRequest(email,otp,password){
//   store.dispatch(showLoader())
//   let URL=BaseURL+"/RecoverResetPass";
//   let PostBody={email:email,otp:otp,password:password}

//   return axios.post(URL,PostBody).then((res)=>{
//     console.log(res)
//       store.dispatch(hideLoader())
//       if(res.status===200){

//           if(res.data['status']==="fail"){
//               errorToast(res.data['data']);
//               return false;
//           }
//           else{
//               setOTP(otp)
//               successsToast("NEW PASSWORD CREATED");
//               return true;
//           }
//       }
//       else{
//           errorToast("Something Went Wrong")
//           return false;
//       }
//   }).catch((err)=>{
//       errorToast("Something Went Wrong")
//       store.dispatch(hideLoader())
//       return false;
//   });
// }
