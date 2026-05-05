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
           Thank you for working with us!
          </h1>

         

          <p className="text-gray-300 leading-relaxed mb-3">
            Together, we grew, innovated,<br /> 
            and built meaningful impact.
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
