import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-location";
import { useMutation } from "react-query";
import { postRequestDocument } from "../api";
import { ReactComponent as CloudUploadIcon } from "../assets/icons/cloud-upload.svg";
import Spinner from "../components/Spinner";

const PresentationUpload = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, reset } = useMutation(
    () => {
      return postRequestDocument(acceptedFiles[0]);
    },
    {
      onSuccess: data => {
        navigate({ to: data.id });
      },
    }
  );

  const onDrop = useCallback(() => {
    reset();
  }, [reset]);

  const {
    getRootProps,
    getInputProps,
    open: openFileDialog,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
    accept: [".doc", ".docx", ".xlsx", ".xls"],
  });

  const isUploadDisabled =
    isDragActive || isLoading || acceptedFiles.length === 0;

  return (
    <>
      {isLoading && (
        <>
          <Spinner />
          <div className="fixed top-0 right-0 bottom-0 left-0 bg-blueGray-400 opacity-30" />
        </>
      )}
      <div className="w-page flex h-screen flex-col p-12">
        <div className="mb-8 flex items-baseline">
          <h1 className="text-2xl font-semibold text-blueGray-500">
            Upload completed SoA request (*.doc, *.docx)
          </h1>
          {!isDragActive && isError && (
            <p className="ml-6 text-red-600">
              Oops! Some thing went wrong. Please check the file format & try
              again.
            </p>
          )}
        </div>
        <div
          {...getRootProps()}
          className={`mb-8 h-full rounded-lg border-2 p-4 ${
            isDragActive ? "border-pink-200" : "border-pink-500"
          } flex flex-col items-center justify-center border-dashed`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className={`text-2xl text-blueGray-400`}>
              Drop the file here ...
            </p>
          ) : (
            <>
              <CloudUploadIcon className="w-16" />
              <p className={`mt-4 text-2xl text-blueGray-700`}>
                Drag & drop to upload
              </p>
              <button
                className="p-2 text-pink-500 hover:underline"
                onClick={openFileDialog}
              >
                or browse
              </button>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`${
              isDragActive ? "text-blueGray-300" : "text-blueGray-500"
            } mr-4`}
          >
            The request will be stored and processed securely.
          </p>
          <div className="flex items-center justify-end">
            {!isDragActive && (
              <>
                {acceptedFiles.length > 0 && (
                  <p className="mr-4 text-blue-700">{acceptedFiles[0].name}</p>
                )}
                {fileRejections.length > 0 && (
                  <p className="mr-4 text-red-600">
                    {fileRejections[0].errors[0].message}
                  </p>
                )}
              </>
            )}

            <button
              className={`rounded-full border border-transparent px-10 py-2 text-base font-medium text-white  ${
                isUploadDisabled
                  ? "cursor-not-allowed bg-pink-200"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
              onClick={mutate}
              disabled={isUploadDisabled}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresentationUpload;
