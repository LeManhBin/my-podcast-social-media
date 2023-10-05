import * as yup from "yup";

const validateMessage = {
  emailValidate: "Email không được để trống",
  passwordValidate: "Password không được để trống",
};

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required(validateMessage.emailValidate)
    .email("Vui lòng nhập đúng định dạng email"),
  password: yup
    .string()
    .required(validateMessage.passwordValidate)
    .min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});
