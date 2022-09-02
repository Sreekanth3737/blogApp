import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../redux/slices/category/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const AddNewCategory = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      //dispatch the action
      dispatch(createCategoryAction(values));
      navigate('/category-list')
    },
    validationSchema: formSchema,
  });

  //get data from store
  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr} = state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 shadow-2xl ">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {/* display err */}
            <div>
              {appErr || serverErr ? (
                <h2 className="text-red-500 text-center text-lg">
                  {serverErr} {appErr}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        <hr />

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Loading please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-semibold rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-zinc-50"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
