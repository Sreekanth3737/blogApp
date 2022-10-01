import React, { Suspense, useEffect } from "react";
// import NewFeed from "./NewFeed";
import Spiner from '../../components/Spinner'
const NewFeed=React.lazy(()=> import('./NewFeed') )

function HomePage() {
 
    
  return (
    <div className="">
      <Suspense fallback={<Spiner />}>

      <NewFeed />
      </Suspense>
      

        
    </div>
  );
}

export default HomePage;
