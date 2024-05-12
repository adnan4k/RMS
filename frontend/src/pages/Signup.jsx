import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [error, setError] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState('')

  const [formData, setFormData] = useState({
    firstname: "",
    lastname:"",
    username:"",
    email: "",
    phonenumber: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false); // Close the dropdown after selecting an option
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
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
      try {
         await axios.post(
          "http://localhost:4001/user/register",
          formData
        ).then((response)=>{
          toast.success(error.response.data.message,'error')

          console.log(response,'respon')
        }).catch((error)=>{
          toast.error(error.response.data.message,'error')
          console.log(error,'error')
        })
        
        // console.log(response.status, "mama");
        setError(response.data)
        if (!response.data.success) {
          
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
      toast("Enter password or email !");

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
            <div className="grid md:grid-cols-2 md:gap-6">

              <input
                onChange={handleChange}
                value={formData.firstname}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstname"
                placeholder="First Name"
              />
              <input
                onChange={handleChange}
                value={formData.lastname}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastname"
                placeholder="Last Name"
              />
            </div>
            <input
              onChange={handleChange}
              value={formData.email}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <div className="grid md:grid-cols-2 md:gap-6">

              <input
                onChange={handleChange}
                value={formData.phonenumber}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phonenumber"
                placeholder="Phone Number"
              />
               <input
                onChange={handleChange}
                value={formData.username}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">

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
                </div>
                <div className="relative z-0 w-full mb-5 group">


                  <button onClick={toggleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    {selectedOption || 'Sign up as'}
                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">

                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div id="dropdown" className={`z-10 ${dropdownVisible ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOptionSelect('Owner')}>Owner</p>
                      </li>
                      <li>
                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOptionSelect('Tenant')}>Tenant</p>
                      </li>
                      <li>
                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOptionSelect('Visitor')}>Visitor</p>
                      </li>
                    </ul>
                  </div>
                </div>
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

                <Link to='/login' className="no-underline border-b border-blue text-blue">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </Layout>
        );
}

        export default Signup;