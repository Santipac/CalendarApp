import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { yupLogin } from '../../helpers';
import { useEffect } from 'react';

import { useAuthStore } from '../../hooks';
import Swal from 'sweetalert2';
export const LoginPage = () => {
  const navigate = useNavigate();
  const { startLogin, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la Autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={yupLogin}
        onSubmit={(values, { resetForm }) => {
          startLogin(values);
          resetForm();
          navigate('/');
        }}
      >
        {({ errors, touched }) => (
          <Form className=" flex flex-col">
            <label htmlFor="email" className={`mb-1 mt-6 `}>
              Correo Electrónico
            </label>
            <Field
              type="email"
              name="email"
              placeholder="ejemplo@example.com"
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                touched.email && errors.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />

            <ErrorMessage
              name="email"
              component={() => (
                <p className="mt-3 text-md text-red-600 dark:text-red-500">
                  {errors.email}
                </p>
              )}
            />
            <label htmlFor="password" className={`mb-1 mt-6 `}>
              Contraseña
            </label>
            <Field
              type="password"
              name="password"
              className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                touched.password && errors.password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <ErrorMessage
              name="password"
              component={() => (
                <p className="mt-3 text-md text-red-600 dark:text-red-500">
                  {errors.password}
                </p>
              )}
            />

            <button
              type="submit"
              className="mt-6 mb-4 p-2.5 text-white font-semibold text-md rounded-lg shadow-md bg-blue-700"
            >
              Ingresar
            </button>
          </Form>
        )}
      </Formik>
      <Link
        to="/auth/register"
        className="text-blue-500 text-end underline decoration-1"
      >
        Crear cuenta
      </Link>
    </AuthLayout>
  );
};
