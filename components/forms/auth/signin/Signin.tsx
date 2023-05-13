// global resources
import React from "react";
import { object, string } from "yup";

import { signIn } from "next-auth/react";

import { FormRender, TButton } from "@/components/commun/form";
import { password } from "@/config/limit";
import { Button, Field } from "@/components/commun";

import { useTranslation } from "react-i18next";

interface FormAuth {
  email: string;
  password: string;
}

const ButtonSubmit: TButton = ({ setCheckError, isLoading }) => {
  const { t } = useTranslation(["form"]);
  return (
    <>
      <Button.Action type="submit" isLoading={isLoading} onClick={() => setCheckError(true)}>
        {t("action.login")}
      </Button.Action>
    </>
  );
};

const FormBody = () => {
  const { t } = useTranslation(["form"]);
  return (
    <>
      <Field.Input<FormAuth>
        name="email"
        label={t("field.email.label") || ''}
        placeholder={t("field.email.placeholder") || ''}
      />
      <Field.Password<FormAuth>
        type="password"
        name="password"
        label={t("field.password.label") || ''}
        placeholder={t("field.password.placeholder") || ''}
      />
    </>
  );
};

const Auth = ({ }) => {
  const { t } = useTranslation(["form"]);
  const authValidator = object().shape({
    email: string().email(t("error.email") || '').required(t("error.required") || ''),
    password: string()
      .required(t("error.required") || '')
      .min(password.minCara, t("error.min", { min: password.minCara }) || '')
      .max(password.maxCara, t("error.max", { max: password.maxCara }) || ''),
  });

  return (
    <>
      <FormRender<FormAuth>
        yupValidator={authValidator}
        onSubmit={(setIsSend, setSendError, setCheckError, setIsLoading) =>
          async (allData) => {
            setIsLoading(true)
            try {
              const result = await signIn('credentials', {
                redirect: false,
                task: 'signin',
                email: allData.email,
                password: allData.password,
              });

              if (!result) {
                setSendError(t('error.api.responseUndefined'));
              } else if (!!result.error) {
                setSendError(t(`error.${result?.error}`));
              } else {
                setIsSend(true);
              }
            } catch (err) {
              console.log(err);
              setSendError(t("error.api.send"));
            }
            setIsLoading(false)
            setCheckError(false);
          }}
        button={ButtonSubmit}
      >
        <FormBody />
      </FormRender>
    </>
  );
};

export default Auth;
