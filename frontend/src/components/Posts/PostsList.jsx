import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPostsAction } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { Grid, useToast } from "@chakra-ui/react";



export default function PostsList() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  //select post from store
  const post = useSelector(state => state?.post);

  const { postLists, loading, appErr, serverErr } = post;
  console.log(postLists);
  return (
    <>
      
    </>
  );
}