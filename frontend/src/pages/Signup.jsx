import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    if (formData.password === formData.password_confirmation) {
      console.log(formData, "form is here ");
      try {
        const response = await axios.post(
          "https://groom-health-care.onrender.com/user/signup",
          formData
        );
        console.log(
          "form submission response",
          response.data,
          response.status,
          response.statusText
        );
        console.log(response.status, "mama");
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
      setError("Passwords do not match. Please try again.");
    }
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
          Already have an account?{" "}
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </form>
    </div>
  );
}

export default Signup;