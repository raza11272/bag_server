import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
// import { CircleUser } from "lucide-react";
// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { gql, useMutation } from "@apollo/client";

// const FILE_UPLOAD = gql`
//   mutation SingleImageUpload(
//     $refId: ID
//     $ref: String
//     $field: String
//     $info: FileInfoInput
//     $file: Upload!
//   ) {
//     upload(refId: $refId, ref: $ref, field: $field, file: $file, info: $info) {
//       data {
//         id
//         attributes {
//           name
//           createdAt
//           updatedAt
//         }
//       }
//     }
//   }
// `;

//@ts-ignore
const DashBoard = () => {
  //@ts-ignore
  const userdata = useSelector((state: authuser) => state.authuser.user);

  // const [image, setImage] = useState(null);
  // const [previewImage, setPreviewImage] = useState(null);
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       setImage(file);
  //       setPreviewImage(URL.createObjectURL(file));
  //     }
  //   },
  //   accept: "image/*",
  // });

  // const [createFile] = useMutation(FILE_UPLOAD);

  // const onHancleCLick = async () => {
  //   await createFile({
  //     variables: {
  //       refId: "3",
  //       ref: "plugin::users-permissions.user",
  //       field: "image",
  //       file: image,
  //     },
  //   });
  // };

  return (
    <div className="flex max-w-lg m-auto gap-8 flex-col  justify-center items-center sectionpadding">
      {/* <div className="mb-6 ">
        <div>
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <p>Drag 'n' drop an image here for DP, or click to select one</p>
            )}
          </div>
        </div>
      </div>
      {image && <Button onClick={onHancleCLick}>Update profile</Button>} */}

      {/* <div className="h-40 rounded-xl overflow-hidden border-2 border-secondary cursor-pointer w-40 flex justify-center items-center ">
        {/* {userdata ? (
          <CircleUser size={"full"} className="text-gray-300" />
        ) : (
          <img src="" alt="" />
        )} */}
      {/* </div> */}
      <div className="flex flex-col justify-center   gap-6  md:items-start">
        {userdata && (
          <h3 className=" text-3xl md:text-6xl text-center md:text-start font-semibold">
            {userdata.username}
          </h3>
        )}
        <div className="flex flex-col  md:flex-row justify-start items-center gap-4">
          <div className="flex gap-4 ">
            <Link to="/createpost">
              <Button size={"sm"}>Create Post</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
//@ts-ignore
// const dropzoneStyles = {
//   border: "2px dashed #0087F7",
//   borderRadius: "4px",
//   padding: "20px",
//   textAlign: "center",
//   cursor: "pointer",
// };

export default DashBoard;
