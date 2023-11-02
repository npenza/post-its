'use client'

import { useState } from "react"

export default function CreatePost() {

  const [title , setTitle] = useState<string>("")
  const [isDisabled , setIsDisabled] = useState<boolean>(false)

  return (
    <form className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea 
        name="title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Whats on your mind"
        className="p-4 text-lg rounded-md my-3 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
        <button disabled={isDisabled} className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25">Post</button>
      </div>
    </form>
  )
}
