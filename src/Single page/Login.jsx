
import { Link } from "react-router-dom";
// import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "./authprovider";
// import useAuth from "./Components/useAuth";


const Login = () => {
  //  const {googleLogin} = useAuth()
  // const { signInUser } = useAuth()
const {googleLogin} = useContext(AuthContext)
const {signInUser} = useContext(AuthContext)


  const {register, handleSubmit,} = useForm();
  const onSubmit = data => {
    const {email, password} = data;
    console.log(data)

    signInUser(email, password)
    .then(result=>{
      
      console.log(result.user);
      if(result.user){
        Swal.fire({
                          icon: "success",
                          title: "Congratulation!",
                          text: "You are logged In",
                          footer: '<p>Thank You</p>'
                        })
    }
    })
    .catch(error=>{
      console.log(error);
      if(error){
        Swal.fire({
                          icon: "error",
                          title: "Oops.!",
                          text: "something went wrong.please try again",
                          footer: '<p>Thank You</p>'
                        })
    }
    })
  };



    return (
        <div>
          
         
         
           <div className="hero min-h-screen bg-yellow-500">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
     
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form  onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required {...register("email", { required: true })}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required {...register("password", { required: true })}/>
          <label className="label">
           <div className="grid grid-cols-2 gap-7">
            <div> <a href="#" className="label-text-alt link link-hover">Forgot password?</a></div>
            <div>
                <Link to="/register">
                         <button className="btn-link">Register Now</button>
                </Link>
            </div>
           </div>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <h2 className="text-center">
          or login with
        </h2>
        
      </form>
      <div className=" text-center grid grid-cols-2 mb-2">
            <div>
                 <button onClick={()=>googleLogin()} title="google" className="text-4xl">
                  <FcGoogle></FcGoogle>
                 </button>
            </div>
            <div>
              <button onClick={()=>githubLogin()} title="github" className="text-4xl">
                <FaGithub></FaGithub>
              </button>
            </div>
        </div>
        

    </div>
  </div>
</div>

        </div>
    );
};

export default Login;