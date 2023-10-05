import * as yup from "yup";

const validateMessage = {
  nameValidate: "Họ tên không được để trống",
  emailValidate: "Email không được để trống",
  passwordValidate: "Password không được để trống",
};

export const registerSchema = yup.object({
  name: yup
    .string()
    .required(validateMessage.nameValidate)
    .min(2, "Họ tên phải lớn hơn 2 ký tự"),
  email: yup
    .string()
    .required(validateMessage.emailValidate)
    .email("Vui lòng nhập đúng định dạng email"),
  password: yup
    .string()
    .required(validateMessage.passwordValidate)
    .min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});
