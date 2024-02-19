"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import CommonTable from "../common/CommonTable";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function AllBlog() {
  const [blogsData, setBlogsData] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [slug, setSlug] = useState();
  const [imageName, setImageName] = useState("");
  const [previousimage, setPreviousImage] = useState();
  const [selectedId, setSelectedId] = useState();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
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
    console.log("image client is: ", image);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleDialogClose = () => {
    setUpdateModalOpen(false);
    setImageName("");
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
        size: 700,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="text-xs">
              <div className="flex items-center gap-4">
                <button className="text-xs text-blue-500" type="button" onClick={() => handleBlogEdit(row)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button className="text-xs text-red-700 " type="button" onClick={() => handleBlogDelete(row)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleGetBlogs = async (e) => {
    // try {
    //   //   const response = await axios.post('http://localhost:3000/api/addcontmessage', { name, email , mobileNumber , message });
    //   const response = await fetch("/api/displayblogs", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const { success1, error, result } = await response.json();
    //   console.log("Blogs Get  successfully:", success1);
    //   if (error !== undefined) {
    //     console.log("Blogs Get error:", error);
    //   }
    //   console.log("Blogs Get result:", result);
    //   setBlogsData(result);
    //   //  setName('');
    //   // setEmail('');
    //   // setMobileNumber('');
    //   // setAddress('')
    // } catch (error) {
    //   console.error("Blogs Get operation error", error);
    // }
  };

  // useEffect(() => {
  //   handleGetBlogs();
  // }, []);

  const handleBlogEdit = async (row) => {
    setSelectedId(row.original.id);
    setTitle(row.original.title);
    setContent(row.original.content);
    setImage(row.original.image);
    setSlug(row.original.slug);
    setPreviousImage(row.original.image);
    setImageName("");
    setUpdateModalOpen(true);
  };

  const handleBlogUpdate = async (e) => {
    // try {
    //   const formData = new FormData();
    //   console.log("inside handleBlogUpdate title", title);
    //   formData.append("title", title);
    //   formData.append("content", content);
    //   formData.append("image", image);
    //   formData.append("slug", slug);
    //   formData.append("selectedId", selectedId);
    //   formData.append("previousimage", previousimage);
    //   const response = await fetch("/api/updateblog", {
    //     method: "PUT",
    //     body: formData,
    //   });
    //   const { success1, error, result } = await response.json();
    //   console.log("Customer Updated  successfully:", success1);
    //   if (error !== undefined) {
    //     console.log("Customer Updated error:", error);
    //   }
    //   console.log("Customer Updated result:", result);
    //   setUpdateModalOpen(false);
    //   handleGetBlogs();
    // } catch (error) {
    //   console.error("Customer Update operation error", error);
    // }
  };

  const handleBlogDelete = (row) => {
    setSelectedId(row.original.id);
    setPreviousImage(row.original.image);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    // try {
    //   const formData = new FormData();
    //   console.log("inside handleBlogUpdate title", title);
    //   formData.append("selectedId", selectedId);
    //   formData.append("previousimage", previousimage);
    //   const response = await fetch("/api/deleteblog", {
    //     method: "DELETE",
    //     body: formData,
    //   });
    //   const { success1, error, result } = await response.json();
    //   console.log("Customer Deleted  successfully:", success1);
    //   if (error !== undefined) {
    //     console.log("Customer Deleted error:", error);
    //   }
    //   console.log("Customer Deleted result:", result);
    //   setDeleteConfirmationOpen(false);
    //   handleGetBlogs();
    // } catch (error) {
    //   console.error("Customer Delete operation error", error);
    // }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">ITEM LIST</h2>
      <CommonTable columns={columns} data={blogsData} />
      <Dialog
        open={isUpdateModalOpen}
        onClose={() => {
          handleDialogClose;
        }}>
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 1, marginBottom: 1, width: "100%" }}
            label="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <div className="mt-6 mb-6">
            <label htmlFor="image" className="mt-16 p-2 border border-gray-300 relative cursor-pointer text-gray-500 hover:text-blue-700">
              <span>{imageName ? imageName : "Upload New Blog Image"}</span>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden text-sm md:text-base md:w-[850px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-gray-300 outline-none rounded-md"
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleBlogUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this blog?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
