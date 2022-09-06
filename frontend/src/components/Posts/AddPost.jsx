//import { Form } from 'formik'
import React from "react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { useRef } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { createpostAction, } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import Dropzone from "react-dropzone";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});



const AddPost = () => {
  const editor=useRef(null)
const [content,setContent]=useState('')
const config={
  placeholder:"Start typing..."
}

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;
  console.log(post);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      //dispatch the action

      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      //console.log(values);
      dispatch(createpostAction(data));
      
      if (post) {
        navigate('/');
      } 
    },
    validationSchema: formSchema,
  });

  return (
    <div>
      <Container>
        <Card className="shadow-xl mt-2 border-0">
          <CardBody>
            <h1>what going in your mind ?</h1>
            <Form onSubmit={formik.handleSubmit}>
              <div className="my-4">
                <Label className="font-bold"   for="title">Post Title</Label>
                <Input value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")} type="text" id="title" placeholder="Enter here..." />
              </div>
               {/* Err msg */}
               <div className="text-red-500">
                  {formik?.touched?.title && formik?.errors?.title}
                </div>

              <div className="my-4">
                <Label className="font-bold"   for="content">Post Content</Label>
                {/* <Input
                  type="textarea"
                  id="content"
                  placeholder="Enter here..."
                  style={{ height: "300px" }}
                /> */}

                <JoditEditor 
                  ref={editor}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  config={config}
                 // onChange={newContent=>setContent(newContent)}
                />
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.description && formik?.errors?.description}
                </div>

              </div>

              <div className="my-4">
                <Label className="font-bold"  for="category">Post category</Label>
                <CategoryDropDown  value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category} type="select" id="category" placeholder="Enter here" >

                

                </CategoryDropDown>
              </div>
              <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/jpeg, image/png image/webp"
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
             
              <Container  className="text-center" >
                <Button  className="rounded-0"  color="primary">Publish</Button>
                <Button className="rounded-0 ms-3" color="secondary">Reset Content</Button>

              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AddPost;
