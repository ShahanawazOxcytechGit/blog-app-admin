"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import SunEditor from "suneditor-react";
import CommonTable from "../common/CommonTable";

const TutorialSubtopic = () => {
  const data = [
    {
      serial: "1",
      title: "title1",
      action: "edit/delete",
    },
    {
      serial: "2",
      title: "title2",
      action: "edit/delete",
    },
    {
      serial: "3",
      title: "title3",
      action: "edit/delete",
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "Serial No.",
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) => {
          return (
            <div className="text-xs">
              <div className="flex items-center gap-4">
                <button
                  className="text-xs text-blue-500"
                  type="button"
                  //   onClick={() => handleEmployeeEdit(row)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button
                  className="text-xs text-red-700 "
                  type="button"
                  //   onClick={() => handleEmployeeDelete(row)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
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

  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.core.setContents(content);
    }
  }, [content]);

  const handleAddTutorial = () => {
    setOpenDialog(true);
  };
  return (
    <div>
      <button
        className="text-white px-2 py-1 m-2 rounded-md  bg-blue-500 "
        onClick={handleAddTutorial}
      >
        Add tutorials
      </button>
      <CommonTable columns={columns} data={data} />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Tutorial </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", px: 4 }}>
          <div className="mx-20 flex flex-col items-center gap-3 py-5 lg:flex-row lg:justify-between lg:items-start">
            <div className="flex flex-col gap-3">
              <TextField
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tutorial Title"
                size="small"
                fullWidth
                variant="outlined"
              />

              <SunEditor
                ref={editorRef}
                setContents={content}
                onChange={setContent}
                placeholder="Tutorial Content"
                setOptions={{
                  width: "100%", // Use percentage for width
                  height: "400px", // Use px unit for height
                  buttonList: [
                    ["undo", "redo"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview", "print"],
                    ["link", "image", "video"],
                    [
                      "font",
                      "fontSize",
                      "formatBlock",
                      "align",
                      "list",
                      "table",
                    ],
                    ["fontColor", "hiliteColor", "horizontalRule"],
                  ],
                  font: ["Arial", "Courier New"], // Example: specify fonts
                  fontColor: "red", // Set font color
                  backgroundColor: "red", // Set background color
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TutorialSubtopic;
