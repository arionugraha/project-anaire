"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import React, { useState } from "react";

interface CldUploadResult {
   public_id: string;
}

const UploadPage = () => {
   const [publicId, setPublicId] = useState("");

   return (
      <>
         {publicId && <CldImage src={publicId} width={270} height={180} alt="The Witcher" />}
         <CldUploadWidget
            uploadPreset="g4thwlaf"
            onUpload={(result, widget) => {
               if (result.event !== "success") return;
               setPublicId((result.info as CldUploadResult).public_id);
            }}
            options={{
               sources: ["local"],
               maxFiles: 5,
               resourceType: "picture",
               multiple: false,
            }}
         >
            {({ open }) => (
               <button className="btn btn-primary" onClick={() => open()}>
                  Upload
               </button>
            )}
         </CldUploadWidget>
      </>
   );
};

export default UploadPage;
