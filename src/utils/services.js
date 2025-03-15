export const submitForget = async ({ username }) => {
  const res = await fetch(
    `https://stg-core.bpapp.net/api/Member/ForgotPassword/${username}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    }
  )
  return res
}

export const submitAccept = async ({ otp, userName, password }) => {
  const response = await (
    "https://stg-core.bpapp.net/api/Member/ForgotPasswordAccept",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp: otp.join(""), userName, password }),
    }
  )
  return response
}
// mohadese.alijani6@gmail.com
