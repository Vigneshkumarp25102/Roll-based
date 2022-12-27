import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBackward, faDeleteLeft, faMagic, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
export function Dashboard(){
    const {Id}=useParams();
   const [details,setdetails] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3002/take/'+Id) 
        .then(response=>response.json())
        .then(json=>setdetails(json))
    },[])

    const alldatadel=(Id)=>{
        var alldata={Id:Id};
        var config={headers:{'enctype':'multipart/form-data'}};

        axios.post('http://localhost:3002/delete',alldata,config)
        .then(function(res){
            if(res.data.status=='Syntax_error'){
                alert('Syntax_error');
            }
            else{
                alert('delete');
                window.location.reload();
            }
        })
    }

        const updateid=(Id)=>{
            alert(Id);
    
          }

    return(
        <>
        <div className="container">
            <div className='row mt-5'>
                <div className='col-lg-8'>&nbsp;</div>
                <div className='col-lg-2'>
                    <Link to={'/'}><FontAwesomeIcon icon={faBackward}/></Link>
                </div>
            </div>
        
            <div className="row mt-3">
                <div className="col-lg-4">&nbsp;</div>
                {
            details.map((value,index)=>(
                <div className="col-lg-4">
                
               
                    <div className="card">
                        <h1 className="text-center">Dashboard</h1>
                        <h3>Firstname :<span className="firstnamedb">{value.First_name}</span></h3>
                        <h3>Lastname :<span className="lastnamedb">{value.Last_name}</span></h3>
                        <h3>Email :<span className="emaildb">{value.Email}</span></h3>
                        <h3>Phone no :<span className="phonodb">{value.Phone_no}</span></h3>
                        <h3>Password :<span className="pasworddb">{value.Password}</span></h3>
                        <div className='row'>
                            
                            <div className='col-lg-4'>&nbsp;</div>
                            <div className='col-lg-2'>
                            <button className='btn btn-outline-none text-primary'><FontAwesomeIcon icon={faTrash} onClick={()=>alldatadel(value.Id)}/></button></div>
                            <div className='col-lg-2'>
                            <button className='btn btn-outline-none text-primary' onClick={()=>updateid(value.Id)}><Link to={"/update/"+value.Id}><FontAwesomeIcon icon={faEdit}/></Link></button></div>
                            <div className='col-lg-4'>&nbsp;</div>
                        </div>
                    </div>
                </div>
                  ))
                }
                <div className="col-lg-4">&nbsp;</div>
                </div>
                
           

        </div>
        
        </>
    );
}