import toast from "react-hot-toast"
import { submitAccept } from "./services"

export const handleReset = async (e, formData, setLoading, navigate) => {
  e.preventDefault()
  const { otp, userName, password } = formData
  if (!userName || !password || otp.some((digit) => digit === "")) {
    toast.error("Please enter your data completely")
    return
  }
  setLoading(true)
  try {
    const res = await submitAccept({ userName, password, otp })
    const data = await res.json()
    setLoading(false)
    if (data.status === true) {
      toast.success("your password changed successfully")
      navigate("/")
    } else {
      toast.error("something went wrong")
    }
  } catch (error) {
    console.log(error)
    toast.error("failed to reset your password")
  }
}

export const handlePaste = (e, formData, setFormData) => {
  e.preventDefault()
  const text = e.clipboardData.getData("text")
  if (!new RegExp(`^[0-9]{${formData.otp.length}}$`).test(text)) {
    return
  }
  setFormData((prev) => ({ ...prev, otp: text.split("") }))
}

export const handleInput = (e, index, setFormData, inputRefs) => {
  const value = e.target.value

  setFormData((prev) => {
    const newOtp = [...prev.otp]
    newOtp[index] = value
    return { ...prev, otp: newOtp }
  })

  if (value && index < inputRefs.current.length - 1) {
    inputRefs.current[index + 1].focus()
  }
}

export const handleKeyDown = (e, index, formData, inputRefs) => {
  if (
    !/^[0-9]{1}$/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "Tab" &&
    !e.metaKey
  ) {
    e.preventDefault()
  }
  if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
    inputRefs.current[index - 1].focus()
  }
}
