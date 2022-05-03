import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import s from './FormByFormik.module.css';

export default function FormByFormik({ onSubmit }) {
  return (
    <div>
      <Formik
        initialValues={{ name: '', number: '', id: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Too short!')
            .max(20, 'Too long!')
            .required('Required'),
          number: Yup.number()
            .required('Required')
            .positive('Positive!')
            .integer(),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          onSubmit(values);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" className={s.form}>
            <label htmlFor="name" className={s.label}>
              Name
            </label>
            <Field
              className={s.input}
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <label htmlFor="number" className={s.label}>
              Number
            </label>
            <Field
              className={s.input}
              id="number"
              type="tel"
              name="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.number}
            />
            {errors.number && touched.number && errors.number}
            <button type="submit" disabled={isSubmitting} className={s.button}>
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
