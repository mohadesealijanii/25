import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import ProgressStep from "../../modules/ProgressStep";
import { PropagateLoader } from "react-spinners";
import { replace, useLocation, useNavigate } from "react-router-dom";
import {
  handleInput,
  handleKeyDown,
  handlePaste,
  handleReset,
} from "../../../utils/helpers";

function AcceptPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    otp: Array(5).fill(""),
    userName: "",
    password: "",
  });
  const [step, setStep] = useState(2);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.username) {
      console.log("first");
      navigate("/forgetPass");
    }
  }, [location, navigate]);

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="">
      <div className="min-w-full flex align-middle justify-center  -mt-5 pb-5">
        <div className="h-145 flex w-screen lg:w-auto sm:w-auto md:rounded-3xl lg:rounded-3xl sm:rounded-3xl shadow-lg bg-white py-2">
          <div className="mx-auto">
            <div className="flex justify-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18602/18602423.png"
                data-src="https://cdn-icons-png.flaticon.com/128/18602/18602423.png"
                alt="Password"
                title="Password"
                width="94"
                className="lazy lazyload--done"
                srcSet="https://cdn-icons-png.flaticon.com/128/18602/18602423.png 4x"
              ></img>
            </div>
            <p className="mb-2 text-center text-ocean font-bold text-xl">
              Reset your password
            </p>
            <section className="flex md:px-7 lg:px-7 sm:px-7 px-3">
              <div className=" justify-center">
                <div className="mb-3">
                  <input
                    placeholder="userName"
                    id="userName"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }))
                    }
                    type="userName"
                    value={formData.userName}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    placeholder="password"
                    id="password"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    type="password"
                    value={formData.password}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean mb-5"
                    required
                  />
                </div>
                <p className="text-slate-600 text-sm text-wrap">
                  enter the 5-digit code that was sent to your phone number
                </p>
                <form id="otp-form" className="flex gap-2 justify-center">
                  {formData.otp.map((digit, index) => (
                    <input
                      id={`otp-${index}`}
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleInput(e, index, setFormData, inputRefs)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, index, formData, inputRefs)
                      }
                      onFocus={handleFocus}
                      onPaste={(e) => handlePaste(formData, setFormData, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="mt-5 shadow-xs flex w-[64px] items-center justify-center rounded-lg  border focus:border-2 p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl focus:border-sea text-ocean"
                    />
                  ))}
                </form>
                <button
                  type="submit"
                  className="bg-ocean rounded-xl py-3 text-white mt-9 mb-3 text-sm w-full"
                  onClick={(e) =>
                    handleReset(e, formData, setLoading, navigate)
                  }
                >
                  {loading ? (
                    <p>
                      <PropagateLoader
                        color="white"
                        className="h-7 content-center -mt-2"
                      />
                    </p>
                  ) : (
                    <p>reset</p>
                  )}
                </button>
                <div className="mt-7 mx-auto">
                  <div className="content-center ml-24">
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

export default AcceptPage;
