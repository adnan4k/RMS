import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function Signup() {
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password) {
      console.log(formData, "form is here ");
      try {
        const response = await axios.post(
          "http://localhost:4001/user/register",
          formData
        );
        console.log(
          "form submission response",
          response.data,
          response.status,
          response.statusText
        );
        // console.log(response.status, "mama");
        setError(response.data)
        if (response.data.status === 400) {
          setError("Your account already exists. Please sign in.");
        }
        if (response.data.role === "admin") {
          navigate("/admin/news/display");
        } else {
          navigate("/appointment");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Enter password or email.");
    }
    console.log(formData);
  };

  return (
    <Layout>
    <div className="flex mt-20 justify-center items-center h-screen">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="bg-white px-6 py-8 rounded shadow-md text-black">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Full Name"
          />

          <input
            onChange={handleChange}
            value={formData.email}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <input
            onChange={handleChange}
            value={formData.password_confirmation}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password_confirmation"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-[#234B9A] text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          
          <Link       to='/login'      className="no-underline border-b border-blue text-blue">
          Login
          </Link>
        </div>
      </form>
    </div>
    </Layout>
  );
}

export default Signup;