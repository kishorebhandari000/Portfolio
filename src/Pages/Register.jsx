import { useState } from "react"
import background from "../assets/background.jpeg"
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from "react-icons/hi"
import { HiEye, HiEyeOff } from "react-icons/hi"

function Register() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    setForm({
      ...form,
      phone: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !form.fname ||
      !form.lname ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.cpassword
    ) {
      setError("Please fill in all fields")
      return
    }

    if (form.password !== form.cpassword) {
      setError("Passwords do not match")
      return
    }

    setError("")
    console.log(form)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-amber-50/40 backdrop-blur-md p-10 rounded-xl w-full max-w-lg space-y-6 shadow-lg"
      >
        <h1 className="font-bold text-3xl text-center text-gray-800">
          Register
        </h1>

        {error && (
          <p className="bg-red-500/20 border border-red-300 text-white px-4 py-2 rounded-lg text-sm">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2 font-semibold text-indigo-700">First Name</p>
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                name="fname"
                value={form.fname}
                onChange={handleChange}
                className="w-full border rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold text-indigo-700">Last Name</p>
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                name="lname"
                value={form.lname}
                onChange={handleChange}
                className="w-full border rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-indigo-700">Phone Number</p>
          <div className="relative">
            <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handlePhoneChange}
              className="w-full rounded border px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-indigo-700">Create Email</p>
          <div className="relative">
            <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-indigo-700">Create Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-indigo-700">Confirm Password</p>
          <div className="relative">
            <input
              type={showCPassword ? "text" : "password"}
              name="cpassword"
              value={form.cpassword}
              onChange={handleChange}
              className="w-full border rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowCPassword(!showCPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showCPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
            </button>
          </div>
        </div>

        {form.cpassword && (
          <p
            className={`text-sm font-medium ${
              form.password === form.cpassword ? "text-green-200" : "text-red-200"
            }`}
          >
            {form.password === form.cpassword
              ? "Passwords match"
              : "Passwords do not match"}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register