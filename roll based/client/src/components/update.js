import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function Update(){

    const {Id}=useParams();

    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const  [phoneno,setPhoneno]=useState('');
    const[password,setPassword]=useState('');

    useEffect(()=>{
        fetch('http://localhost:3002/update/'+Id)
        .then(response=>response.json())
        .then(function(res){
            setFirstname(res[0].First_name);
            setLastname(res[0].Last_name);
            setEmail(res[0].Email);
            setPhoneno(res[0].Phone_no);
            setPassword(res[0].Password);
        })
        .catch(function(error){
            alert(error);
        })
    
    },[])

    const sumbitup=async(action)=>{

        action.preventDefault();

        let alldata=new FormData(action.target)
        let config={headers:{'enctype':'multipart/form-data'}}

       await axios.put('http://localhost:3002/change/'+Id,alldata,config)
       .then(function(res){
        if(res.data.status==='Syntax_error'){
            alert('Syntax_error');
        }
        else if(res.data.status==='success'){
            alert('update');
            window.location.href='/Dashboard/'+Id
        }
           })
        
        .catch(function(error){
            alert(error);
        })


    }
    




    return( 
        <>
        <div className="container">
            <div className="row mt-5">
            <div className="col-lg-4">&nbsp;</div>
            <div className="col-lg-4">
                <div className="card">
                    <form onSubmit={sumbitup}>
                 
                    <div className="row mt-2">
                        <div className="col-lg-4">
                            <label className="firstnameudlabel">
                            First name :
                            </label>
                        </div>
                        <div className="col-lg-8">
                            <input type={"text"} name="firstnameud" id="firstnameud" className="firstnameud form-control" value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-4">
                            <label className="lastnameudlabel">
                                Last name :
                            </label>
                        </div>
                        <div className="col-lg-8">
                            <input type={"text"} name="lastnameud" id="lastnameud" className="lastnameud form-control" value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-4">
                            <label className="emailudlabel">
                                Email :
                            </label>
                        </div>
                        <div className="col-lg-8">
                            <input type={"text"} name="emailud" id="emailud" className="emailud form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-4">
                            <label className="phoneudlabel">
                                Phone no :
                            </label>
                        </div>
                        <div className="col-lg-8">
                            <input type={"text"} name="phoneud" id="phoneud" className="phoneud form-control" value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-4">
                            <label className="passwordudlabel">
                                Password :
                            </label>
                        </div>
                        <div className="col-lg-8">
                            <input type={"text"} name="passwordud" id="passwordud" className="passwordud form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                    <div className="col-lg-5">&nbsp;</div>
                    <div className="col-lg-2">
                        <input type={"submit"} name="sumbitup" id="sumbitup" className="sumbitup" value={'Update'}/>
                    </div>
                    <div className="col-lg-5">&nbsp;</div>
                </div>
               
                </form>
                </div>
            </div>
            <div className="col-lg-4">&nbsp;</div>
            </div>

            
            </div>
        </>
    );
}