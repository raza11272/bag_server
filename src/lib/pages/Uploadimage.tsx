// // src/components/ImageUpload.js
// import React, { useCallback } from "react";
// import { gql, useMutation } from "@apollo/client";
// import { useDropzone } from "react-dropzone";

// const UPLOAD_IMAGE = gql`
//   mutation Upload($file: Upload!, $field: String, $ref: String, $refId: ID) {
//     upload(file: $file, field: $field, ref: $ref, refId: $refId) {
//       data {
//         attributes {
//           url
//         }
//       }
//     }
//   }
// `;

// const ImageUpload = () => {
//   const [uploadImageMutation] = useMutation(UPLOAD_IMAGE);

//   const onDrop = useCallback(
//     async (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       console.log(file);
//       try {
//         uploadImageMutation({
//           variables: {
//             refId: "55",
//                 ref: "api::news-post.news-post",
//                 field: "image",
//                 file: formData,
//           },
//         });
//         // console.log("Image uploaded successfully:", data.upload);
//       } catch (error) {
//         console.error("Error uploading image:", error.message);
//       }
//     },
//     [uploadImageMutation]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()} style={dropzoneStyles}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the image here ...</p>
//       ) : (
//         <p>Drag 'n' drop an image here, or click to select one</p>
//       )}
//     </div>
//   );
// };

// const dropzoneStyles = {
//   border: "2px dashed #0087F7",
//   borderRadius: "4px",
//   padding: "20px",
//   textAlign: "center",
//   cursor: "pointer",
// };

// export default ImageUpload;
