import React from "react";

import { Formik, Form } from "formik";
import { useEmailJS } from "@/extensions/emailjs/useEmailJS";
import { ValuesType, initialValues, validationSchema } from "./formUtils";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import RadioInput from "@/components/RadioInput";

import { BsPersonFill, BsFillPencilFill } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";

import colors from "@/assets/scss/colors.module.scss";
import styles from "./ContactUsForm.module.scss";

const reactOptions = [
  { label: "Email", value: "email" },
  { label: "Text (SMS)", value: "sms" },
];

const ContactUsForm = () => {
  const resetRef = React.useRef<HTMLButtonElement>(null);
  const { sendEmail, isSuccess, isLoading, isError } = useEmailJS();

  React.useEffect(() => {
    if (isSuccess && resetRef.current) {
      resetRef.current.click();
    }
  }, [isSuccess]);

  const handleSubmit = (values: ValuesType) => {
    sendEmail(values);
  };

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: "1rem" }}>
        Contact <span style={{ color: colors.primary }}>Us</span>
      </h1>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className={styles.form}>
            <TextField
              name="name"
              type="text"
              label="Name"
              placeholder="Your Name"
              icon={<BsPersonFill color={colors.primary} size={22} />}
              disabled={isLoading}
            />
            <TextField
              name="email"
              label="Email"
              placeholder="Your Email"
              type="text"
              icon={<MdEmail color={colors.primary} size={22} />}
              disabled={isLoading}
            />
            <TextField
              name="phone"
              label="Phone Number"
              placeholder="Your Phone Number"
              type="text"
              icon={<MdPhone color={colors.primary} size={22} />}
              disabled={isLoading}
            />

            <TextField
              name="query"
              label="How can we help you?"
              placeholder="Your Message"
              component="textarea"
              rows="4"
              as="textarea"
              style={{ height: "auto" }}
              icon={<BsFillPencilFill color={colors.primary} size={22} />}
              maxLength="1000"
              disabled={isLoading}
            />

            <RadioInput
              name="reach"
              label="How should we contact you?"
              options={reactOptions}
              disabled={isLoading}
            />

            {isError && (
              <h6
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBlock: "1.5rem",
                }}
              >
                An Error occured, Please try again later
              </h6>
            )}
            {isSuccess && (
              <h6
                style={{
                  color: "#4BB543",
                  textAlign: "center",
                  marginBlock: "1.5rem",
                }}
              >
                Thanks for contacting us! We will be in touch with you shortly.
              </h6>
            )}

            <div className={styles.btn_wrapper}>
              <Button isLoading={isLoading} type="submit">
                Send
              </Button>
            </div>

            <button
              type="reset"
              style={{ display: "none" }}
              ref={resetRef}
            ></button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
