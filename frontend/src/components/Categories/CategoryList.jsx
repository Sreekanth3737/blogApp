import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import UpdateCategory from "./UpdateCategory";


const CategoryList = () => {
  const dispatch = useDispatch();
useEffect(()=>{
  dispatch(fetchCategoriesAction())
},[dispatch])


  const category = useSelector(state => state?.category);
//console.log(category);
  const { categoryList, loading, appErr, serverErr } = category;
const navigate=useNavigate()

  const UserUpdate=(id)=>{
    
    navigate(`/update-category/${id}`)
  
   
  }


  return (
    <>
      {loading ? (
        <>
        <LoadingComponent />
        </>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col  ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left  font-serif text-red-700 uppercase  tracking-wider"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left  font-serif text-red-700 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left  font-serif text-red-700 uppercase tracking-wider"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left  font-serif text-red-700 uppercase tracking-wider"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {categoryList?.map(category=>(
                      <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={category?.user?.profilePhoto} alt="category profile" />

                              </div>
                              <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                     {category?.user?.firstName}{"."}{category?.user?.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                      {category?.user?.email}
                                  </div>
                              </div>
                            </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/* {category?.createdAt} */}
                          {<DateFormatter date={category?.createdAt} />}
                        </td>

                       
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="bg-sky-500 hover:bg-sky-700 ">
                           <PencilAltIcon onClick={()=>{UserUpdate(category?._id)}} className="h-5 bg-sky-500 hover:bg-sky-700 text-zinc-100 " />
                           </button>
                          </td>
                         
                         
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </>
  );
};

export default CategoryList;
