import React, {useEffect, useState} from 'react';

export default function Packages() {
  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    await getPackages();
  };

  const getPackages = async () =>{

  }


  return <div><h1>Packages</h1></div>;
}
