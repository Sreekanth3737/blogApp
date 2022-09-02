import React from "react";
import { Container, Row } from 'tailwind-react-ui'

function HomePage() {
  const data = [
    {
      Tailwind:
        "In the dispensation of CSS libraries and frameworks, a ton of awesome libraries have been built to simplify the work of a developer in the quest to create intuitive interfaces. However, quite a lot of them (Bootstrap, Foundation) impose design decisions that are difficult to undo; they come with predefined components, therefore, eliminating the need for dynamic customization. This is the reason why Tailwind CSS is considered to be a good choice for building 21st-century web interfaces.With Tailwind CSS, you get to create the components that suit what you want or what you are working on. These components can be created by harnessing the power of the utility-first prowess of Tailwind CSS. If you are tired of making use of Bootstrap and its likes, you’ll find Tailwind CSS a good fit for working on beautiful interfaces as you implement the designs you need using the utility classes it provides.",
    },
    {
      Api:"React version 18 was released, and since it is a major new version of React it does, as you would expect, introduce some new, exciting features. Thankfully, though it does not break your existing code, what you learned about react still applies. The code you write still is the same.You have to go to your root entry file, typically index.js and then in that file replace the import of ReactDOM from react-dom with this import, where you import from react-dom/client. So that’s a tiny addition you have to make to the import statement and replace the line where you called ReactDOM.render to render the root component into some element in the index.html file with the line below where you call to create a root on React DOM instead and you pass the root element in the index.html file to create root and then on this root object which is returned by createRoot, you call render to render the root component into this root element in index.html.Now besides these new APIs and hooks, you also get some changes for existing features. For example, state batching state batching already existed in older versions of React as well, and it’s all about grouping multiple state updating calls together so that they are executed as one state update call instead of multiple calls."
    }
  ];
  return (
    <div className="container mx-auto px-4">
      
      
      {/* <h1 className=" m-8 text-6xl text-indigo-700">Home Page</h1> */}
      <h2 className="m-8 text-4xl text-indigo-700" >Tailwind CSS-React js</h2>
      <h6 className="mx-8">Author - James harison</h6>
      <p className="m-8"> {data.map((x) => x.Tailwind)}</p>
      <h2 className="m-8 text-4xl text-indigo-700">3 New API’s In React 18 Every React Developer Should Know</h2>
      <h6 className="mx-8">Author - Akshay Saini</h6>

      <p className="m-8"> {data.map((x) => x.Api)}</p>

      <h2 className="m-8 text-4xl text-indigo-700">React js - Hooks</h2>
      <h6 className="mx-8">Author - Brad Traversy</h6>

      <p className="m-8"> {data.map((x) => x.Tailwind)}</p>
      <h2 className="m-8 text-4xl text-indigo-700">3 New API’s In React 18 Every React Developer Should Know</h2>
      <h6 className="mx-8">Author - Brad Traversy</h6>

        <p className="m-8"> {data.map((x) => x.Api)}</p>

        
    </div>
  );
}

export default HomePage;
