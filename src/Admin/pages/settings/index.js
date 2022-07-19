import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css'


import axios from 'axios'

const Websetting = () => {

  const [image, setimage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
const [imageName, setimageName] = useState("");

const SubmitForm=(e)=>{
  // e.preventDefault();
handleSubmit(e);
SubmitData(e)
}
  const handleSubmit = (e) => {
    e.preventDefault();
const data=new FormData();
data.append('images',image)

    axios.post('http://localhost:8000/admin/websetting', {
      name: name,
      email: email,
      address: address,
      imageName:imageName
      // newFile: image,
    }).then((res) => console.log(res))
  }
  
  const fetchData = () => {
    axios.get("http://localhost:8000/admin/websetting")
      .then(res => {
        // setData({data:res.data})
        console.log(res.data.result)
        setName(res.data.result[0].name)
        setEmail(res.data.result[0].email)
        setAddress(res.data.result[0].address)
        setimage(res.data.result[0].logo)
      })
  }
  const SubmitData=(e)=>{
    e.preventDefault();
    const data=new FormData();
    data.append('newFile',image)
    axios.post('http://localhost:8000/admin/websetting/image',data)
  }
  const change=(e)=>{
    setimage(e.target.files[0]);    
    setimageName(e.target.files[0].name)

  }
  useEffect(() => {
    fetchData()

  }, []);
  
  return <div>
    <h1>Admin Settings</h1>
    <button type="button" className="btn-primary modal-btnn" data-bs-toggle="modal" data-bs-target="#exampleModal">
Edit
</button>

    <form  encType="multipart/form-data"  method='POST' >
    
      <label htmlFor="name" >Website Name</label> <br />
      <input type="text"  value={name} disabled id="name" /><br />
      <label htmlFor="email">Website Email</label> <br />
      <input type="email" value={email}  disabled id="email" /><br />
      <label htmlFor="address">Website Address</label> <br />
      <input type="text" value={address}  disabled id="address" /><br />
      <label htmlFor="logo">Website Logo</label>
      <img src={""} alt="" />

    {/* <input type="file" name='newFile' id='logo' /> */}
    </form>

{/* MoDAL */}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form id='form2' onSubmit={SubmitForm} encType="multipart/form-data"  method='POST' >
    
    <label htmlFor="name" >Change Website Name</label> <br />
    <input type="text" onChange={(e) => setName(e.target.value)} value={name} id="name" /><br />
    <label htmlFor="email">Change Website Email</label> <br />
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" /><br />
    <label htmlFor="address">Change Website Address</label> <br />
    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="address" /><br />
    <label htmlFor="logo">Change Website Logo</label>
  <input type="file" onChange={change} name='newFile' id='logo' />
    <button  type='submit' data-bs-dismiss="modal" >Submit</button>
  </form>     
   </div>
      {/* <div className="modal-footer">
        
      </div> */}
    </div>
  </div>
</div>

  </div>;
}

export default Websetting;
