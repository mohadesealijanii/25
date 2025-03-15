import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import ProgressStep from "../../modules/ProgressStep";
import { Link, useNavigate } from "react-router-dom";
import { submitForget } from "../../../utils/services";

export default function ForgetPassPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username) {
      toast.error("please enter your username");
      return;
    }
    setLoading(true);
    const response = await submitForget({ username });
    setLoading(false);
    const data = await response.json();

    if (data.status === true) {
      navigate("/accept", { state: { username } });
    } else {
      setUsername("");
      toast.error("something went wrong!");
    }
  };

  return (
    <div>
      <div className="min-w-full flex items-center align-middle justify-center pb-5 -mt-5">
        <div className="flex w-screen sm:w-auto md:w-auto lg:w-auto mx-auto md:rounded-3xl lg:rounded-3xl sm:rounded-3xl shadow-lg bg-white px-16 py-5">
          <div className="mx-auto">
            <div className="flex mb-3 justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18505/18505272.png"
                data-src="https://cdn-icons-png.flaticon.com/128/18505/18505272.png"
                alt="Security shield"
                title="Security shield"
                width="94"
                className="lazy lazyload--done"
                srcSet="https://cdn-icons-png.flaticon.com/128/18505/18505272.png 4x"
              ></img>
            </div>
            <p className="mb-2 text-center text-ocean font-bold text-xl">
              Enter your username
            </p>
            <p className="text-slate-600 text-sm text-wrap mb-9 text-center">
              please type your username to recover your account
            </p>
            <section className="bg-white">
              <div className="container">
                <div>
                  <input
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    value={username}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>
                <div className="flex mt-2 text-[13px] sm:text-sm lg:text-sm md:text-sm ">
                  <p className="text-left">if you remember your password</p>
                  <Link
                    to="/signin"
                    className="text-ocean underline text-sm pl-1"
                  >
                    sign in
                  </Link>
                </div>
                <button
                  type="submit"
                  className="bg-ocean rounded-xl py-3 text-white mt-9 mb-3 text-sm w-full"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <p>
                      <PropagateLoader
                        color="white"
                        className="content-center -mt-2 h-7"
                      />
                    </p>
                  ) : (
                    <p>submit</p>
                  )}
                </button>
                <div className="mt-7 mx-auto">
                  <div className="content-center md:ml-23 sm:ml-23 lg:ml-23 ml-20">
                    <ProgressStep step={step} />
                  </div>
                </div>
              </div>
            </section>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
