import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, toggleAddLikeToPost,toggleAddDisLikeToPost  } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { Grid, useToast } from "@chakra-ui/react";
import * as DOMPurify from 'dompurify';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";



import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";


export default function PostsList() {
  //dispatch
  const dispatch = useDispatch();
  const navigate=useNavigate()
  
  //select post from store
  const post = useSelector((state) => state?.post);
  const user=useSelector((state)=> state?.users)
  const {userAuth}=user
  const { postLists, loading, appErr, serverErr ,likes, dislikes} = post;
  console.log(postLists);
  
  useEffect(() => {
    if(userAuth){

      dispatch(fetchPostsAction(""));
    }else{
      navigate('/login')
    }
  }, [dispatch,likes,dislikes,navigate]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //const refresh=(postLists)=>{}
  
  
  const category = useSelector(state => state?.category);
  //console.log(category)
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  return (
    <div className="container mx-auto">
    <CardGroup>
  <Card className="mx-3 mt-5">
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
  
</CardGroup>

</div>

  );
} 
    
