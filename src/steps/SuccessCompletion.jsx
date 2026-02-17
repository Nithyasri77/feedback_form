import React from 'react'
import TopBar from '../components/navigations/TopBar'

const SuccessCompletion = () => {
  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">

      {/* TOP BAR */}
      <TopBar />

      {/* SUCCESS CONTENT */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-[#1f2937] p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h1 className="text-4xl sm:text-5xl font-normal font-stylefont mb-5">
           Welcome Aboard!
          </h1>

          <p className="text-gray-300 leading-relaxed mb-6">
            You journey with <br/> 
            <span className="font-stylefont2 text-xl sm:text-xl text-white">Shine Craft technologies</span>
            <br />
            begins here.
          </p>

          <p className="text-gray-300 leading-relaxed mb-3">
            Together, we grow, innovate,<br /> 
            and build meaningful impact.
          </p>
        </div>

        {/* <button
          onClick={() => window.location.reload()}
          className="mt-8 w-full max-w-md py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Submit Another Enrollment
        </button> */}
      </div>
    </div>
  )
}

export default SuccessCompletion
