import React from "react";

// 全局layout
export default function(props) {
    if (props.location.pathname === '/login') {
    //   return <SimpleLayout>{ props.children }</SimpleLayout>
    }
  
    return (
      <>
        {/* <Header /> */}
        { props.children }
        {/* <Footer /> */}
      </>
    );
  }