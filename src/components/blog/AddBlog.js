"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Dynamically import ReactQuill

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.core.setContents(content);
    }
  }, [content]);

  const handleImageChange = (e) => {
    console.log("inside handleImageChange");
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    //   try {
    //     const formData = new FormData();
    //     formData.append("title", title);
    //     formData.append("content", content);
    //     formData.append("image", image);
    //     //   const response = await axios.post('http://localhost:3000/api/addcontmessage', { name, email , mobileNumber , message });
    //     console.log("before api , image is", image);
    //     const response = await fetch("/api/addblog", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     const { success1, error, result } = await response.json();

    //     console.log("Blog Added successfully:", success1);
    //     if (error !== undefined) {
    //       console.log("Blog Added error:", error);
    //     }
    //     console.log("Blog Added result:", result);
    //     setTitle("");
    //     setContent("");
    //     setImage(null);
    //     setImageName("");
    //   } catch (error) {
    //     console.error("Blog addition operation error", error);
    //   }
  };

  return (
    <>
      <div className="bg-white my-5 rounded-md shadow-[0px_5px_20px_lightgray] mb-20">
        <h1 className="p-4 text-3xl font-semibold">Add Blog</h1>

        <div className="p-2 rounded-md md:p-5">
          <h2 className="ml-[480px] text-2xl font-semibold uppercase">Blog Details</h2>

          <div className="ml-44 mr-60 flex flex-col items-center gap-3 py-5 lg:flex-row lg:justify-between lg:items-start">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
                className="text-sm md:text-base md:w-[850px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-gray-300 placeholder-gray-500 outline-none rounded-md"
              />
              <label htmlFor="image" className="p-2 border border-gray-300 relative cursor-pointer text-gray-500 hover:text-blue-700">
                <span>{imageName ? imageName : "Upload Blog Image"}</span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden text-sm md:text-base md:w-[850px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-gray-300 outline-none rounded-md"
                />
              </label>
              {/* <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write something..."
                className = "bg-gray-100 h-80"
              /> */}
              <SunEditor
                ref={editorRef}
                setContents={content}
                onChange={setContent}
                placeholder="Blog Content"
                className="text-black"
                setOptions={{
                  width: "100px",
                  height: "1000px", // Use px unit for height
                  buttonList: [
                    ["undo", "redo"],
                    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview", "print"],
                    ["link", "image", "video"],
                    ["font", "fontSize", "formatBlock", "align", "list", "table"],
                    ["fontColor", "hiliteColor", "horizontalRule"],
                  ],
                  font: ["Arial", "Courier New"], // Example: specify fonts
                  fontColor: "red", // Set font color
                  backgroundColor: "red", // Set background color
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-5">
            <button onClick={handleAddBlog} className="bg-green-500 text-white rounded px-2 py-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
