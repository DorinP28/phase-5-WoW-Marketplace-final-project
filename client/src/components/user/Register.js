import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";

function Register() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().min(8, "Password must be at least 8 characters long").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      contact_details: Yup.string().max(200, "Contact details can't exceed 200 characters"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message); 

          setUser({ username: values.username });

          history.push("/");

          resetForm();
        } else {
          const data = await response.json();
          alert(data.message || "Registration failed.");
        }
      } catch (error) {
        alert("There was an error during registration.");
      }
      setSubmitting(false);
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
            placeholder="Username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? <div style={{ color: "red" }}>{formik.errors.username}</div> : null}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
            placeholder="Contact Details"
            {...formik.getFieldProps("contact_details")}
          />
          {formik.touched.contact_details && formik.errors.contact_details ? <div style={{ color: "red" }}>{formik.errors.contact_details}</div> : null}
        </div>
        <button style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
