import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from './SidebarContext';

import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Category({ setgetcatname }) {

      const { isOpen, setIsOpen } = useContext(SidebarContext);
  
  
  const [categories, setCategories] = useState([])

  function fetchCategories() {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        //console.log("maal", data)
        setCategories(data)
      })
  }

 


  useEffect(() => {
    fetchCategories()
  }, [])
 
  const [sidebarheader, setsidebarheader] = useState(false)

  const handleScroll = (e) => {
    setsidebarheader(e.target.scrollTop > 10)
  }

  return (
    <div onScroll={handleScroll} className="h-full overflow-auto ">

     
      {/* HEADER */}
      <div
        className={`sticky top-0 h-[60px] flex flex-wrap justify-center items-center 
        ${sidebarheader ? 'shadow-md bg-white' : 'bg-transparent' }`}
      >
        {/*
        <form className="bg-red-400" onSubmit={formsubmit}>
          <input
            type="text"
            value={searching}
            onChange={(e) => setsearching(e.target.value)}
            className="border text-black"
            placeholder="Enter category"
          />
          <button type="submit">Submit</button>
        </form>
        */}
        <div className="px-2 font-semibold text-xl flex w-full items-center">
          <span className='text-start bg-slate-100 flex items-center justify-center p-2 rounded-full shadow hover:bg-slate-200'
          onClick={()=>setIsOpen(!isOpen)}><AiOutlineArrowLeft /></span>
          <h2 className='w-full text-center underline'> Categories ({categories.length})</h2> 
        </div>
        
      </div>
    <hr />
      {/* CATEGORY LIST */}
      {categories.map((item, i) => (
        <div key={i} className="px-5">
          <h3
            onClick={() => {
              setgetcatname(item);
              setIsOpen(!isOpen);
            }} 
            className="py-2 rounded-md px-2 cursor-pointer bg-slate-100 my-1 font-medium hover:bg-slate-50 shadow hover:scale-105"
          >
            {item.name}
            
          </h3>
        </div>
      ))}
    </div>
  )
}
