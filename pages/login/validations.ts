import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email không đúng')
    .max(255)
    .required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  // .password('Password invalid'),
})

export { schema }
