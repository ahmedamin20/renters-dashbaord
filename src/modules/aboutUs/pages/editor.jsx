import { Editor } from "react-draft-wysiwyg";
import "./editor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
const EditorTap = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // This function will handle the submission of the content to your API
    const handleSubmit = () => {
      // Get the ContentState from the EditorState
      const contentState = editorState.getCurrentContent();
      
      // Convert the ContentState to a raw JavaScript object
      const contentStateAsRaw = convertToRaw(contentState);
  
        // Convert the raw content to JSON or any suitable format
        const contentToSend = JSON.stringify(contentStateAsRaw);
        const test = () => { contentStateAsRaw.blocks.forEach(item=>item.text.join()) }
        // console.log(contentState)
        console.log(test())
        // console.log(contentToSend)
        // Now, you can send the content to your API using a library like Axios or fetch
         // Replace 'yourApiEndpoint' with your actual API endpoint
      
    };
  
  const { t } = useTranslation();
  return (
    <Box
      my={2}
      display="flex"
      flexDirection="column"
      sx={{ gridColumn: "span 4" }}
    >
      <button onClick={handleSubmit}>Submit Content</button>
      <label style={{ fontSize: "20px", fontWeight: "bold" }}>
        {t("Description")}
      </label>
      <Editor
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        editorState={editorState}
        onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
          />
    </Box>
  );
};
export default EditorTap;
