import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ImageUpload = () => {
  const [profilePicture, setProfilePicture] = useState([]);

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const image = await imagebase64(file);
    setProfilePicture(image);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const res = await axios.post("/api/updateProfilePicture", {
      //     profilePicture,
      //     _id: user._id,
      //   });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mb-5 space-y-8 w-full  xl:w-2/3"
        >
          <div className="relative grid grid-cols-1 gap-4">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute top-2 h-20 w-full opacity-0"
            />
            <div className="flex flex-row p-2 justify-start gap-5 items-center border-dashed border-2 border-slate-200 rounded-md">
              <div className="flex justify-center flex-col items-start">
                <h3 className="text-base font-semibold">Profile Picture</h3>
                <p className="text-xs text-slate-400">PNG, JPG upto 1MB</p>
                {profilePicture && <p>{profilePicture.path}</p>}
                <Button
                  type="submit"
                  variant="link"
                  className="inline p-0 mt-2 h-5 z-50 relative"
                  disabled={!profilePicture}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* <h1>{profilePicture.path}</h1> */}
      </div>
      {/* Display uploaded images */}
      <div className="mt-2 flex flex-wrap gap-3">
        {Array.isArray(field.value) &&
          field.value.map((file, index) => (
            <div key={index} className="relative mt-1 border-1 h-20">
              <img
                src={URL.createObjectURL(file)} // Display image preview
                alt={`Uploaded image ${index + 1}`}
                className="max-w-36 h-13"
              />
              {/* Cancel button to remove the image */}
              <button
                type="button"
                onClick={() => {
                  const updatedFiles = field.value.filter(
                    (_, i) => i !== index
                  );
                  field.onChange(updatedFiles);
                }}
                className="absolute top-[-8px] right-[-8px] h-5 w-5 bg-red-600 border-red-600 border-2 text-white rounded-full flex items-center justify-center text-xs"
              >
                X
              </button>
            </div>
          ))}
      </div>{" "}
    </div>
  );
};

export default ImageUpload;
