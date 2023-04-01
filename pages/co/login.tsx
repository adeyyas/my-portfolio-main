import classNames from "classnames"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import * as Yup from 'yup'
import { loginService } from "@/services/auth.service"
import { setLogin, setUser } from "../../reducers/main.reducer"
import { useRouter } from "next/router"
import axios from "@/services/base.service"

const INITIAL_VALUES = {
  email: 'adeyyas@gmail.com',
  password: 'deneme1234'
}

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required()
    }),
    onSubmit: async values => {
      setLoading(true)
      const [err, response] = await loginService(values);
      setLoading(false)

      // is error
      if (err) {
        setResponseError(err.response.data.message)
        return;
      }

      const { user, token } = response;

      localStorage.setItem('token', token)
      axios.defaults.headers.Authorization = `Bearer ${localStorage.token}`;
      dispatch(setLogin(true))
      dispatch(setUser(user))
      router.push('/co')
    }
  })

  const focusHandler = () => {
    setResponseError(null)
  }

  return <div id="auth-page">

    <div id="wrapper">
      <h1>Giriş Yap</h1>
      {!loading && responseError ?
        <div id="error">
          {responseError}
        </div>
        : ''}

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="E-posta"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={focusHandler}
          value={formik.values.email}
          className={classNames({ error: formik.touched.email && formik.errors.email })}
        />
        <input
          type="password"
          placeholder="Şifre"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={focusHandler}
          value={formik.values.password}
          className={classNames({ error: formik.touched.password && formik.errors.password })}
        />

        <button
          type="submit"
          className="btn"
          style={{ marginTop: '1.5rem' }}
        >Giriş Yap</button>
      </form>
    </div>

  </div>
}

export const getServerSideProps = ({ }) => {
  return { props: {} }
}

export default LoginPage;