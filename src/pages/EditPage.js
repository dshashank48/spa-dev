import Form from "@rjsf/semantic-ui";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMatch } from "react-location";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { putPresentationPage } from "../api";
import { useAuthContext } from "../auth";
import { PageAlerts } from "../components/Alerts";
import NavigatorSidebar from "../components/NavigatorSidebar";
import NewSlideButton from "../components/NewSlideButton";
import { PresentationPageView } from "./PresentationPage";

import "react-quill/dist/quill.snow.css";

const CustomEditForm = ({ presentationId, data }) => {
  const { register, setValue } = useFormContext();

  const handleContentChange = value => {
    setValue("presentationPage.attributes.pageData.content", value);
  };

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(putPresentationPage, {
    onMutate: data => {
      queryClient.setQueryData(
        [
          "presentation",
          { presentationId, pageId: data.presentationPageData.id },
        ],
        data.presentationPageData
      );
    },
  });

  return (
    <form
      className="ui form w-full"
      onSubmit={e => {
        e.preventDefault();

        toast.promise(
          mutateAsync({
            presentationId,
            presentationPageData: {
              ...data,
              attributes: {
                ...data.attributes,
                source: "",
                warnings: [],
              },
            },
          }),
          {
            pending: "Submitting...",
            success: "Success 👌",
            error: "Oops! Something went wrong 🤯",
          }
        );
      }}
    >
      <h5 className="ui dividing header">Edit</h5>

      <div className="field">
        <label htmlFor="title">Title</label>
        <div className="ui fluid input">
          <input
            disabled={isLoading}
            name="title"
            type="text"
            placeholder="Title"
            {...register("presentationPage.attributes.title")}
          />
        </div>
      </div>

      <div className="field">
        <label className="text-base font-bold">Content</label>
        <ReactQuill
          theme="snow"
          value={data.attributes.pageData.content}
          onChange={handleContentChange}
          modules={{
            toolbar: [
              [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ align: [] }],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
      </div>

      <button type="submit" className="ui primary button" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

const EditForm = ({ presentationId, data, schema, uiSchema = {} }) => {
  const { setValue } = useFormContext();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(putPresentationPage, {
    onMutate: data => {
      queryClient.setQueryData(
        [
          "presentation",
          { presentationId, pageId: data.presentationPageData.id },
        ],
        data.presentationPageData
      );
    },
  });

  return (
    <div className="mb-8 w-full">
      <Form
        noHtml5Validate
        disabled={isLoading}
        schema={schema}
        uiSchema={uiSchema}
        formData={data.attributes.pageData}
        onChange={({ formData }) => {
          setValue("presentationPage.attributes.pageData", formData);
        }}
        onSubmit={() => {
          toast.promise(
            mutateAsync({ presentationId, presentationPageData: data }),
            {
              pending: "Submitting...",
              success: "Success 👌",
              error: "Oops! Something went wrong 🤯",
            }
          );
        }}
      />
    </div>
  );
};

const getSchema = ({ type }) => {
  try {
    const schema = require(`../resources/schema/${type}.json`);
    return schema;
  } catch (e) {
    return null;
  }
};

const getUISchema = ({ type }) => {
  try {
    const uiSchema = require(`../resources/uiSchema/${type}.json`);
    return uiSchema;
  } catch (e) {
    return {};
  }
};

const EditPageSideBar = ({ presentationId, presentationPageData }) => {
  switch (presentationPageData.attributes.type) {
    case "custom":
      return (
        <CustomEditForm
          presentationId={presentationId}
          data={presentationPageData}
        />
      );
    default:
      const schema = getSchema({
        type: presentationPageData.attributes.type,
      });

      const uiSchema = getUISchema({
        type: presentationPageData.attributes.type,
      });

      if (!schema) {
        return null;
      }

      return (
        <EditForm
          presentationId={presentationId}
          data={presentationPageData}
          schema={schema}
          uiSchema={uiSchema}
        />
      );
  }
};

// const DATE_KEYS = ["dob"];

// const formatDate = data => {
//   Object.keys(data).forEach(key => {
//     if (_.isObject(data[key])) {
//       formatDate(data[key]);
//     } else {
//       if (DATE_KEYS.includes(key)) {
//         let val = data[key];
//         let dateString = dayjs(val, "DD/MM/YYYY", true).format("YYYY-MM-DD");
//         data[key] = dateString;
//       }
//     }
//   });
//   return data;
// };

const EditPage = () => {
  const {
    data: { presentationPage, presentationHome },
  } = useMatch();

  const { parsedToken } = useAuthContext();
  const isParaplanner = parsedToken.realm_access.roles.includes("paraplanner");

  const methods = useForm({
    defaultValues: { presentationPage, presentationHome },
  });

  useEffect(() => {
    if (presentationPage) {
      methods.setValue("presentationPage", presentationPage);
    }
  }, [methods, presentationPage]);

  const presentationPageData = methods.watch("presentationPage");
  const presentationHomeData = methods.watch("presentationHome");
  const currentPage = presentationHomeData.attributes.playlist.find(
    page => page.id === presentationPageData.id
  );

  return (
    <FormProvider {...methods}>
      <div className="edit-page grid grid-cols-2 gap-0">
        <div className="h-page overflow-hidden">
          <div className="h-full overflow-y-auto overflow-x-hidden bg-gray-800 px-3">
            <NavigatorSidebar
              presentationHomeData={presentationHomeData}
              presentationPageData={presentationPageData}
            />
          </div>
        </div>
        <div className="h-page box-wrap flex flex-col bg-gray-300">
          {isParaplanner && (
            <div className="absolute left-4 right-4 top-4">
              <PageAlerts />
            </div>
          )}
          <div className="box size-60">
            {!currentPage.visible && (
              <div className="absolute left-0 right-0 top-20 -bottom-20 z-10 -mt-1 flex items-center justify-center rounded-md bg-gray-400 bg-opacity-75 py-1 px-2 ">
                <p className="font-mono text-5xl font-bold text-gray-700">
                  Not Visible
                </p>
              </div>
            )}
            <NewSlideButton insert="before" />
            {/* <div className="relative"> */}
            <PresentationPageView presentationPageData={presentationPageData} />
            {/* </div> */}
            <NewSlideButton insert="after" />
          </div>
        </div>
        <div
          className="h-page overflow-hidden bg-gray-100"
          style={{ paddingBottom: 100 }}
        >
          <div className="h-full max-h-full overflow-y-auto overflow-x-hidden bg-white px-3 pt-3 pb-20">
            <EditPageSideBar
              presentationId={presentationHomeData.id}
              presentationPageData={presentationPageData}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EditPage;
