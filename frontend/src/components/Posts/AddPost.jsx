//import { Form } from 'formik'
import React from "react";
import JoditEditor from "jodit-react";

import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { useRef } from "react";
import { useState } from "react";



const AddPost = () => {
  const editor=useRef(null)
const [content,setContent]=useState('')
const config={
  placeholder:"Start typing..."
}
  return (
    <div>
      <Container>
        <Card className="shadow-xl mt-2 border-0">
          <CardBody>
            <h1>what going in your mind ?</h1>
            <Form>
              <div className="my-4">
                <Label className="font-bold"   for="title">Post Title</Label>
                <Input type="text" id="title" placeholder="Enter here..." />
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
                  value={content}
                  config={config}
                  onChange={newContent=>setContent(newContent)}
                />
              </div>

              <div className="my-4">
                <Label className="font-bold"  for="category">Post category</Label>
                <Input type="select" id="category" placeholder="Enter here" >

                <option>
                    react
                </option>

                <option>
                   next js
                </option>

                <option>
                    tailwind
                </option>

                <option>
                   redux
                </option>

                </Input>
              </div>
             
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
