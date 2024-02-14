// import { Button } from '@/components/ui/button'
// import React, {useCallback, useState} from 'react'
// import {useDropzone,FileWithPath} from 'react-dropzone'


// type FileUploaderProps = {
//     fieldChange:(FILES:File[])=>void
//     mediaUrl:String
// }

// const UplodImageDrop = ({fieldChange,mediaUrl}:FileUploaderProps) => {
//     const [file, setFile] = useState<File[]>([])
//     const [fileUrl, setFileUrl] = useState('')
    
//     console.log({fileUrl});


    


//     const onDrop = useCallback((acceptedFiles:FileWithPath[] )=> {
//         setFile(acceptedFiles)
//         fieldChange(acceptedFiles)
//         setFileUrl(URL.createObjectURL(acceptedFiles[0]))
//       }, [file])
//       const {getRootProps, getInputProps} = useDropzone({onDrop,accept:{
//         'image/*':['.png','.jpg','.jpeg']
//       }})
//   return (
//     <div {...getRootProps()}>
//     <input {...getInputProps()}  />
//     {
//       fileUrl ?(
//   <div className="">
//     <img src={fileUrl} alt="" />
//   </div>
//       ):(
//         <div className="">
//             <Button>select from coumputer</Button>
//         </div>
//       )
       
//     }
//   </div>
//   )
// }

// export default UplodImageDrop