import { PlusCircleIcon, BookOpenIcon,ArchiveIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryAction,
  updateCategoriesAction,
  deleteCategoriesAction,
} from "../../redux/slices/category/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const UpdateCategory = () => {
  const { id } = useParams();
 
  const dispatch = useDispatch();
    const navigate=useNavigate()
  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, []);

  //get data from store
  const state = useSelector((state) => state?.category);
  //console.log(state);
  const { loading, appErr, serverErr, fetchCategory } = state;
  console.log(state?.fetchCategory?.title);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: state?.fetchCategory?.title,
    },
    onSubmit: (values) => {
      //build up the date for update

      //dispatch the action
      dispatch(updateCategoriesAction({ title: values.title, id }));
      navigate('/category-list')
      
    },
    validationSchema: formSchema,
  });

  return (
      <div className="container">
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-xl  w-full space-y-8 shadow-2xl ">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
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
                  className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-semibold rounded-md text-white bg-indigo-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-zinc-50"
                      aria-hidden="true"
                    />
                  </span>
                  Update Category
                </button>

                
              )}
             
                <button
                onClick={()=>dispatch(deleteCategoriesAction(id))}
                
                  type="submit"
                  className=" mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
                >
                     <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArchiveIcon
                      className="h-5 w-5 text-zinc-100 group-hover:text-zinc-50"
                      aria-hidden="true"
                    />
                  </span>
                  
                 Delete Category
                </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateCategory;
