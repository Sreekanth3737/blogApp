import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsList({ comments }) {
    //console.log(comments);
   const user= useSelector(state=>state?.users)
   const {userAuth}=user
   const isLoginUser=userAuth?._id
   console.log(isLoginUser);
    const dispatch=useDispatch()
  return (
    <div>
      <ul className="divide-y bg-zinc-100 shadow-xl w-96 divide-gray-300 p-3 mt-5">
        <div className="text-gray-500">{comments?.length} Total Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-indigo-600 text-lg text-center">No comments</h1>
          ) : (
            comments?.map(comment => (
              <>
                <li key={comment?._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                       <Link to={`/profile/${comment?.user?._id}`}>
                       <h3 className="text-sm font-medium text-gray-900">
                          {comment?.user?.firstName} {comment?.user?.lastName}
                        </h3>
                       </Link>
                        <p className="text-bold text-indigo-600 text-base ml-5">
                          

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                        
                      </div>
                      <p className="text-sm text-zinc-900">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}




                      {/*  */}

                     {isLoginUser===comment?.user?._id ?  <p class="flex">
                        <Link to={`/update-comment/${comment?._id}`} class="p-3">
                          <PencilAltIcon class="h-5 mt-3 text-indigo-500" />
                        </Link>
                        <button onClick={()=>dispatch(deleteCommentAction(comment?._id))} class="ml-3">
                          <TrashIcon class="h-5 mt-3 text-red-600" />
                        </button>
                      </p> : null}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}