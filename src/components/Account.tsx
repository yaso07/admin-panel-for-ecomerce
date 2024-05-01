import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigation } from "react-router-dom";
import styled from "styled-components";
import {Image} from "../components/ProductForm";
import { uploadImageFirebase as uploadToFirbase } from "../utils/firebase";
import axios from "axios";
import {getUrl} from '../utils/api'
import { Seller } from "../types/Seller";
import Loading from "./Loading";

const Container = styled.section`
  display:grid;
  grid-template-columns:1fr 1fr;
  width:100%;
  align-items:center;
  height: 150px;
  box-sizing: border-box;
`;
const Input = styled.input`
  display: block;
  outline-color: rgb(220, 218, 218);
  border: 1px solid rgb(220, 218, 218);
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
`;

 
const Account = () => {

     const [account,setAccount]=useState<Seller>();
     console.log(account)
     const navigation=useNavigation();
    useEffect(()=>{
        // const getEvent=async()=>{
        //      const {data}=await axios.get(getUrl()+`seller/${_id}`)
        //      setAccount(data);
        // }

        // getEvent();
        const data:Seller={
          name: "",
          email: "",
          mobile: "",
          city: "",
          state: "",
          image: ""
        }
        setAccount(data)
    },[])
    const [image,setImage]=useState<FileList|null>();
    const {register,handleSubmit}=useForm();
    console.log(register)
    const uploadImage=()=>{
          const input=document.createElement('input')
          input.type='file';
          input.click();
          input.required=true
          input.addEventListener('change',()=>{
                setImage(input.files)
           })
    }
    const upload=async(event:any)=>{
       
        const imageObj=new Image();
        imageObj.setImage(image)
        const res=await uploadToFirbase(imageObj,'images/customer')
        const form={...event,image:res}
        const resd=await axios.post(getUrl()+'seller',form)
        console.log(resd)
    }
  return (
    <>
      <main className="w-full">
        {navigation.state == "loading" && <Loading></Loading>}
        <Container>
          <div>
            <div>
              <p className="text-3xl px-6">Account</p>
            </div>
          </div>
        </Container>
        <Form
          method="post"
          onSubmit={handleSubmit(upload)}
          className="grid grid-cols-3 gap-y-5 gap-x-7 w-11/12 px-5 py-10 items-center"
        >
          <div className="border border-gray-200 h-full rounded-lg row-span-3">
            <div className="flex flex-col gap-y-2 px-5 py-7 items-center">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/traditional-images.appspot.com/o/blank-profile-picture.webp?alt=media&token=f10ddca2-75f5-4915-90ae-de093bb8bfdb"
                alt=""
              />
              <p className="text-2xl">User Name</p>
              <p>city,country</p>
            </div>
            <div className="w-full">
              <hr className="bg-gray-200" />
            </div>
            <div className="w-full p-2">
              <button
                type="button"
                onClick={uploadImage}
                className="w-full text-blue-600 hover:bg-blue-100 p-2 rounded-md"
              >
                Upload picture
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              {...(register("name"),
              { required: true, minLength: 4, pattern: "^[a-zA-z]+$" })}
              defaultValue={account?.name ?? ""}
              name="name"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <Input
              type="email"
              {...(register("email"),
              {
                pattern: "^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$",
              })}
              defaultValue={account?.email ?? ""}
            />
          </div>
          <div>
            <label htmlFor="mobile">Mobile number </label>
            <Input
              type="text"
              {...(register("mobile"),
              {
                required: true,
                pattern: "^[0-9]{10}+$",
                minLength: 10,
                maxLength: 10,
              })}
              defaultValue={account?.mobile ?? ""}
              name="mobile"
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <Input
              type="text"
              {...(register("city"), { minLength: 4, pattern: "^[a-zA-z]+$" })}
              defaultValue={account?.city ?? ""}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <Input
              type="text"
              {...(register("state"), { minLength: 4, pattern: "^[a-zA-z]+$" })}
              name="state"
              defaultValue={account?.state ?? ""}
            />
          </div>

          <div
            className="flex gap-x-5 w-full mb-1 "
            style={{ alignSelf: "flex-end", flexFlow: "row-reverse" }}
          >
            <button
              type="button"
              className="border-2 border-gray-300 px-2 py-1.5  rounded-md flex-end"
            >
              Cancel
            </button>
            <button className="text-white w-full bg-violet-600 px-2 py-2  rounded-md flex-end">
              Save
            </button>
          </div>
        </Form>
      </main>
    </>
  );
};

export default Account;
