import React from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  return (
    <AuthLayout title="Register">
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Ingrese un nombre con al menos 2 caracteres')
            .required('El nombre es requerido'),
          email: Yup.string()
            .email('Email Inválido')
            .required('El email es requerido'),
          password: Yup.string()
            .required('La contraseña es requerida')
            .min(2, 'La contraseña debe tener al menos 2 caracteres'),
        })}
        onSubmit={(values, { resetForm }) => {
          try {
            console.log(values);
            navigate('/');
          } catch (error) {
            setIsError(true);

            return error;
          }
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className=" flex flex-col">
            <label htmlFor="name" className={`mb-1 mt-6 `}>
              Nombre
            </label>
            <Field
              type="name"
              name="name"
              placeholder="Juan"
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                touched.name && errors.name
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />

            <ErrorMessage
              name="name"
              component={() => (
                <p className="mt-3 text-md text-red-600 dark:text-red-500">
                  {errors.name}
                </p>
              )}
            />
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
            {isError && (
              <div className="bg-red-500 p-2.5 rounded-md flex items-center mt-6 text-center text-white">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className=" font-semibold text-center w-full">
                  Error! Correo y/o Contraseña invalido(s)!
                </p>
              </div>
            )}
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
        to="auth/login"
        className="text-blue-500 text-end underline decoration-1"
      >
        Ya tienes una cuenta?
      </Link>
    </AuthLayout>
  );
};
