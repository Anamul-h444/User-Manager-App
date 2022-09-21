import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  isEmpty(value) {
    return value.length === 0;
  }
  isEmail(value) {
    return !EmailRegx.test(value);
  }
  isMobile(value) {
    return !MobileRegx.test(value);
  }

  successsToast(msg, msg2) {
    var msg2 = { position: toast.POSITION.BOTTOM_LEFT };
    return toast.success(msg, msg2);
  }

  errorToast(msg, msg2) {
    var msg2 = { position: toast.POSITION.BOTTOM_LEFT };
    return toast.error(msg, msg2);
  }
}
export const { isEmpty, isEmail, isMobile, successsToast, errorToast } = new FormHelper();
