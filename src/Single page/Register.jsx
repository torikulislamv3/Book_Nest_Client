// import React from 'react';

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import auth from "../components/firebase/firebase.config";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { AuthContext } from "./authprovider";



const Register = () => {
   
    const [showPassword, setShowPassword] = useState(false)
  

    const { createUser} = useContext(AuthContext)
   

    
   

    const {
        register,handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        const {email, password} = data
             if(password.length <6){
            (Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Input your password minimum 6 digit",
                footer: '<a href="#">Why do I have this issue?</a>'
              }))
            return;
        }
              if (!/[A-Z]/.test(password)) {
           
           (Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Input your password minimum a uppercase charecter",
                footer: '<a href="#">Why do I have this issue?</a>'
              }))
              return;
            }

                if (!/[a-z]/.test(password)) {
            (Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Input your password minimum a lowercase",
                footer: '<a href="#">Why do I have this issue?</a>'
              }))
            return;
        }

        createUser(email, password)
        .then(result =>{
            console.log(result.user)
            if(result.user){
                Swal.fire({
                                  icon: "success",
                                  title: "Congratulation!",
                                  text: "Your Account Successfully Created",
                                  footer: '<p>Thank You</p>'
                                })
            }
        })
        .catch(error=>{
            console.log(error);
            if(error){
                Swal.fire({
                                  icon: "error",
                                  title: "You are failed!",
                                  text: "Please Try Again!",
                                  footer: '<p>Thank You</p>'
                                })
            }
           
        })

        
        
    }
    

    
    return (
        <>
       
        <div className="rounded-lg bg-[#FFFFFF] pt-[5%]">
            <h1 className="text-center text-3xl text-yellow-700 font-bold mb-5">
                Register Now !
            </h1>
            <div className="text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="border-[3px] mb-4 w-2/4 px-2 py-2 rounded-tl-xl text-2xl" type="text" name="name" id="" placeholder="Input Your Name"
                {...register("fullName", { required: true })}/>
                 {errors.fullName && <span className="text-red-500">This field is required</span>}
                <br />
                <input className="border-[3px] mb-4 w-2/4 px-2 py-2 rounded-tl-xl text-2xl" type="email" name="email" id=""  placeholder="Input Your Email" required
                 {...register("email", { required: true })}/>
                 {errors.email && <span className="text-red-500">This field is required</span>}
                <br />
                <input className="border-[3px] mb-4 w-2/4 px-2 py-2 rounded-tl-xl text-2xl" type="text" name="photo" id=""  placeholder="Input Your Img Url"
                 {...register("url")}/>

                <br />
               <div className="relative">
               <input
                 className="border-[3px] mb-4 w-2/4 px-2 py-2 rounded-tl-xl text-2xl bg-transparent"
                 type={showPassword ? "text" : "password"}
                   name="password" id="" required
                    placeholder="Input Your Password"
                    {...register("password")}
                    
                    />
          <span className="absolute text-xl mt-5 ml-[-50px]" onClick={()=> setShowPassword(!showPassword)}>
          {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
          </span>
                    
               </div>
                    
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Accept our Terms & Condition</label>
                    </div>

                <div>
                    <button className="btn btn-success bg-blue-800 mb-5"><input className="text-xl text-[#FFFFFF]" type="submit" value="Register Now" /></button>

                    <Link to="/login">
                    <button className="btn btn-link">already have an account? Log In</button>
                    </Link>
                </div>
            </form>
            {/* {
                RegisterError && <p className="text-red-900">{RegisterError}</p>
            }
            {
                success && <p className="text-green-900 text-3xl font-bold">{success}</p>
            } */}
           
            
            </div>
        </div>
        </>
    );
};

export default Register;