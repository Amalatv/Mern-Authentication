import React from 'react'

const Hero = () => {
    return (
        <div className="heroImage bg-cover bg-center h-screen relative top-[76px]">
            <div className="absolute inset-0 bg-black/60">
            <div className="w-full max-w-md max-auto flex flex-col pt-10 gap-6 p-10">
                <h1 className="text-gray-400 flex  text-xl pt-20">Welcome to the Luminotech</h1>
                <h1 className="font-bold text-4xl md:text-5xl text-white">Grow Your Skills With Us</h1>
                <p className="text-blue-300 mb-5 md:mb-10">find the new home to develop with technology</p>
                <button className="px-3 py-2 w-40 rounded-lg bg-slate-300 hover:bg-slate-200 text-blue-900 font-semibold cursor-pointer">JOIN NOW</button>
            </div>
            </div>
        </div>
    )
}

export default Hero