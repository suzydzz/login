import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import styles from "./UserForm.module.css";
import type { SubmitHandler } from "react-hook-form";

// 1. Определяем тип для данных формы
interface FormValues {
  name: string;
  surName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  fullName: string;
  isEditMode?: boolean;
}

// 2. Пропсы компонента
interface UserFormProps {
  onSubmit: SubmitHandler<FormValues>;
  user?: Partial<FormValues>;
  isEditMode?: boolean;
}

// 3. Схема валидации с явным указанием типа
const schema: yup.ObjectSchema<Omit<FormValues, "isEditMode">> = yup.object().shape({
  name: yup.string().required("Name is required").max(64),
  surName: yup.string().required("Surname is required").max(64),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().when("$isEditMode", {
    is: false,
    then: (schema) => schema.required("Password is required"),
  }),
  confirmPassword: yup.string().when("$isEditMode", {
    is: false,
    then: (schema) =>
      schema
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
  }),
  fullName: yup.string().required().max(130),
});

export const UserForm = ({
  onSubmit,
  user,
  isEditMode = false,
}: UserFormProps) => {
  // 4. Используем явное указание типов для useForm
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: user || {},
    mode: "onBlur",
    context: { isEditMode } // Передаем контекст для валидации
  });

  const name = watch("name");
  const surName = watch("surName");

  useEffect(() => {
    if (name && surName) {
      setValue("fullName", `${name} ${surName}`);
    }
  }, [name, surName, setValue]);

  // 5. Безопасное отображение ошибок
  const getErrorMessage = (fieldName: keyof FormValues) => {
    const error = errors[fieldName];
    return error?.message ? (
      <span className={styles.error}>{error.message}</span>
    ) : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Name*</label>
        <input {...register("name")} />
        {getErrorMessage("name")}
      </div>

      <div className={styles.formGroup}>
        <label>Surname*</label>
        <input {...register("surName")} />
        {getErrorMessage("surName")}
      </div>

      <div className={styles.formGroup}>
        <label>Email*</label>
        <input {...register("email")} disabled={isEditMode} />
        {getErrorMessage("email")}
      </div>

      {!isEditMode && (
        <>
          <div className={styles.formGroup}>
            <label>Password*</label>
            <input type="password" {...register("password")} />
            {getErrorMessage("password")}
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password*</label>
            <input type="password" {...register("confirmPassword")} />
            {getErrorMessage("confirmPassword")}
          </div>
        </>
      )}

      <div className={styles.formGroup}>
        <label>Full Name*</label>
        <input {...register("fullName")} />
        {getErrorMessage("fullName")}
      </div>

      <button type="submit" className={styles.submitButton}>
        {isEditMode ? "Update User" : "Create User"}
      </button>
    </form>
  );
};