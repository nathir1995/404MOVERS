import React from "react";
import { useTranslation } from "utility/language";
import { useModal } from "hooks";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Formik } from "formik";
import { PasswordField } from "components/input/PasswordField";
import { LoadingButton } from "components/input/LoadingButton";
import { useAutoClosingModal } from "hooks";
import * as Yup from "yup";

const ChangePassword = ({ id, mutation }) => {
  const t = useTranslation();
  const { isOpen, toggleModal, openModal, closeModal } = useModal();
  useAutoClosingModal(mutation, closeModal, true);

  const handleSubmit = (values) => {
    mutation.mutate({
      id,
      ...values,
    });
  };

  return (
    <>
      <p
        onClick={openModal}
        className="p-0 m-1"
        style={{ color: "blue", cursor: "pointer" }}
      >
        {t("change_password")}
      </p>
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpen}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>{t("change_password")}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <PasswordField
                  name="password"
                  label={t("password")}
                  placeholder="Password"
                />
                <PasswordField
                  name="confirm_password"
                  label={t("confirm_password")}
                  placeholder="Confirm Password"
                />
                <LoadingButton
                  className="mt-1 float-right"
                  color="primary"
                  type="submit"
                  isLoading={mutation.isLoading}
                >
                  {t("change")}
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ChangePassword;

var validationSchema = Yup.object().shape({
  password: Yup.string().required("_required.password"),
  confirm_password: Yup.string()
    .required("_required.password")
    .oneOf([Yup.ref("password"), null], "validation.passwords_match"),
});

var initialValues = {
  password: "",
  confirm_password: "",
};
