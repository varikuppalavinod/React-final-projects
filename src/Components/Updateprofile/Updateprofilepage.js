import {useContext} from "react"
import{useRef} from "react"
import classes from"./Updateprofilepage.module.css"
import cartcontext from "../Store/Authcontext"

const Updateprofilepage=()=>{

  const cartctx=useContext(cartcontext)
    const inputnameref=useRef()
    const inputurlref=useRef()

    const submithandler=(event)=>{
        event.preventDefault()
        const enteredname=inputnameref.current.value;
        const enteredurl=inputurlref.current.value;

       // console.log( "this is update form",enteredname,enteredurl)
      
      const idToken=cartctx.token;

       const url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLedg5jzm00E9kPND4FG9kuKewUFMNOtY"

       fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            idToken:idToken,
            displayName:enteredname,
            photoUrl:enteredurl,
            returnSecureToken:true,
        }),
       
       }).then(response=>{
        if(response.ok){
            return response.json()
        }else{
            return response.json().then(data=>{
               // let errormessage="Authentication failed"
                throw new Error(data.error.message)
            })
        }
       }).then(data=>{
        console.log(data)
       }).catch(err=>{
        alert(err.message)
       })
    }
return(
    <div>
    <div className={classes.page}>
        <div>
            <p>winner never quite, Quiters never win.</p>
        </div>
        <div className={classes.complete}>
            <p>your profile is 64% completed.A complete profile has higher chances
                of landing a job.<button>Complete now</button>  </p>
        </div>
    </div>
    <div>
        <div className={classes.contact}>
        <h2>Contact detalis</h2>
        <h2><button>Cancel</button></h2>
        </div>
        <form className={classes.name} onSubmit={submithandler}>
         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAACUCAMAAADIzWmnAAAAbFBMVEX///8XFRUAAAAUEhLt7e3S0tLNzc0OCwv8/Pz4+Pjg4OARDw+FhYXq6uoIAwOwsLB4eHhxcXFfX184NzfBwcGcnJxnZmZSUVFXV1e4t7fY2NimpqZ/f39KSkooJydGRUUfHR2Pjo4wMDBAPj6UbDISAAAHb0lEQVR4nO1c2ZaiMBBtKkhYJIiAiguy/P8/Dri0ASpAQrDngXvOzEO3XV6S2lPh52fFihUrVqxYseJ/g207DWz7r4mgcM5xcEmK667BtUguQXw2/5oUBzPd7m9lDm0Y5W2/Tf8DnrabXknDiHrEaIN4lDW/uaau84cMzcsuqukZQ/AAyvDi/w1B53zIxgg+QQGyg/X9xTSDG4A3geDvat6DLy9mcgQ2meATDG7J93ySGRBphg0osMuX7Dw+SmxyGx7c4y8wNHcEFBk2YDRcWi2dGKDrCOVQe9N0URN3dsrb/IEH4YJauSlnLuJ7KTNrKYoJVbFmDJQmy1AsNOzzGx5cF2Do7+eYcx9wdLVTPOqlWJO8aXZC/kk3Re0r6Ub6KdYkS40kzQVW8UFS33abms2FI3nSRfKwFMWa5F4PxWI5ijXJrQ6KlyUp1iQ1RJxz1ilZmlqPqYVt8igU2z/z8vmxO+/IhH1ShHdDpph5kamzuioskkPnmZkxk6G97T7206f5wa6cVBN+GGavCtavuhuzm1fmWLSzqx9DdC9sMst6DZPzm0nYeWzCZtUPZtnNxuDy+a1ziVo7TjxKKWOs/r/VtSBQJlxWm3aNkOVzvGR3p2uOrfDlF8brEw9r8LLofrvd7lH2tKzXn7Br64/MvtCdOkW3b7/Q/UgFD3rR7hJvXNf3fbP+57qbOLhWD6KQnzv61kvmCWxUKTr9AEOz3qeC0zUQ5QZmuj31/V8/tMJetQyLkWVEYteweOS31x5HAqpmg6S1czTnFwkit1LzPzESBLWUIVh0hUBJFJY0auGIrKPBjiqSYoIEZS17jSVShKXyguwdlu/ASQNHXHIob9puNwo+4HX9owruWCuBgHxxgylN87ga2pwCyYW0IAPPF5Qd2QdnnCNlsoI2guwbwtkc+0nAS7RssisQpB4QPrAE6bGsz3BOeItMQWn6uOAdQnqUa0taOSpGxUEgwCtNQuT2CC8GPeOsg+KPGaEGyefP43C6+fxLiJZiuEaAi5faJTPHHtSjus6AbNSNe0xGIV38OXUYzBOChZRRpV5Z9HjMTDmj78G9YxsllaDhUf+g8bhPkFdISEAbyxq3WrDZ7DZdgJ1hkUBKW8ZgYn7cy6fvlIl5cMK0HqF1W12Pr5BoBmx6wxE1aKSTIlqJEG96WhFj3ktXy/WFfgFrSGV+aCTUUsp8gObQEtEQ/3udZi0wbInvQJPHr3CcnhDgHHUlFEty1HtSiuv8XI7zKxkeaJ47m+M3fM9MjuyulSN6vjeXI9IenQM0y5XgiOoKAa3xOkfTlun+Da+4ls97ZOIMmoartjFxYA3Y+iumN/gsLO/RG7BxdZLIe3wD48iUm/8I0OKYGNPzRxtVaC/XWHOhXQCZPPynQrs9cn2EQeAazyoJEfh0Ahy1FYaCPshBQoTg7F+b9/EF8mU2StBqlXrOIaDBWnINcA9b250eq3HR2riOZDL9HuQ087WQOtyPjWujrHTBqQLRYtopeqwiPaISC8SonKJ0YQr64YTK9XH9m2BUgkVzp6/Mu+BcgcpOnwnnt+A0TyVt4fCatNfA85KHqHLOVLIpnlKUP1YRTzBDpH5GY1VCikT+KFLgHx4kc9V2QNGduuKlytedZ34hHzeN+EeOFGblnTQaGC8nCoGWH8yEY5GEBj/NxuAgeSZuB4fByyKwV1DzT7MDCru5lmcdGbeWAFlxdqYlQraz2Wbdgb0uR5VK5HMY9Tt9k2b893gAVRFs/GGetm8F22h0zI9GSt7iEw9/1fmctReD1at5218TwTUoP0iu+3s+5daX6qjm57ALspe7cXulO2lu6IlMcgfABFG1s4y5GkU+06XwuovlIqYpDj3ioNIVoZqr+MfPopGH4fxgGdFQLmChFWYP7KicBbQC4ktjnN7SDDpf9Dyrv4wzpgv4Awrv5WQ33cJ20GuI4z4vYc7UkMs4Pm8XlLbNdKRXNeHmksdmJaWtAvG9YJecN25aDkqYcNVhZnLv8KebrHy5a8t4T4gTT+x4nhif0ofjzCLJb+32r2onx+d1ay86BMNxZlQhPTb7XgU/6MLptmMFSZIE8agmWSMctZRxXONZdrqlgWjg6ve5dRz78LW2QgI1wlFPxf7jGxxJ6T7pMEeQ6DgO4sxN28NWsnc2yJGV2nrsFv14bQjlHO4QR0o13imNudAC0UVmKQc4Ug1DgBwsbnCqdttbyzUbXbcd07WGzUjMkWq43dMmyRdMpE6/97ttsb2G+2xktFLIkUnPZI5i0y4Tnu/HaNLskfsQwoFUjVNXv3AF2YEaRzhpv5LbwD/g52cKHAkcFnorgJ14SBU/whGL18xb8E0VMdJSkucI1aIvgPB3vYaILEcGu6Xf/pDeO1o54kI6HAncFS5PyMJP2q+okOFYO9bkO292cUOPT3wncyTgSQb7ObBCCtIcgYaLvZYCg705vDtN0zhSgMPm66/rMouqpkmhGs4pzKr5EFTF37z9ykyvZb4fC7ubfV5e//D9XLbvj5cjjj/SRl2xYsWKFStWrPgG/gGMDVq01WRkOwAAAABJRU5ErkJggg=="  alt="github"/>
        <label>Full Name:</label>
        <input type="text" ref={inputnameref}/>
        <img src="data:image/jpeg;base64,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w5igZPhzrsduI8JruVrhyELn/Gst4zh0Rhr4ppKcEOAadvGCOBZa5Z7FhcBzBVZWkL8Pe6Nx3OY5vcuHM5h4/iEG5fzR9s/KVozFjsOXYHz4i6zG7gPCc7ka0cpK5p+NUnbDs/Uj2u122rc6mtq6luN7eVfPHcwVWaZA/EHmRw3NY0dy0czYxw/HpQbNlzD5tJeJvmxId5a5skvitjHzcA6+HVrlVXM2kOhy2C0yCWUCwiiIJHMHO+Swde/oUewXLeM4jEIaCKaOnJLiHHYRkniX3sX+1bvlvQuyKzswz6547OK7WeWQ7z5AEGp4hi2J6T5tlSMtECDs2kiFg5HSycp6/IFWciZDgymzWHfKhws+Ui27xI2+C32nl5lsmGYbDhcYjw6NscY4Na2w6+k9K9qAiIgIiICIiAiIgIiICIiAiIgIiICIiAvhPSsqPn2Nd9ZoP4r7ogx/aOl49iw/8DP0XpgpWU/zDGt+q0D8F90QEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k="alt="web" />
        <label>Profile Photo url</label>
        <input type="text" ref={inputurlref}/> 
        <button type="submit">Update</button>
        </form>
    </div>
    </div>
)
}
export default Updateprofilepage

/*
import {useContext} from "react"
import { useRef } from "react";
import classes from "./Updateprofilepage.module.css";
import cartcontext from "../Store/Authcontext"

const UpdateProfilePage = () => {

  const cartctx=useContext(cartcontext)
  console.log(cartctx)

  const inputNameRef = useRef();
  const inputUrlRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredUrl = inputUrlRef.current.value;

    const idToken=cartctx.token
    console.log(idToken)

    const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLedg5jzm00E9kPND4FG9kuKewUFMNOtY";
                 
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken:idToken,
        displayName: enteredName,
        photoUrl: enteredUrl,
        returnSecureToken: true,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(data => {
         // let errorMessage = "Authentication failed!";
          throw new Error(data.error.message);
        });
      }
    })
    .then(data => {
      console.log(data);
      // handle successful response
    })
    .catch(err => {
      alert(err.message);
    });
  };

  return (
    <div>
      <div className={classes.page}>
        <div>
          <p>Winner never quits, Quitters never win.</p>
        </div>
        <div className={classes.complete}>
          <p>Your profile is 64% completed. A complete profile has higher chances
            of landing a job.<button>Complete now</button>  </p>
        </div>
      </div>
      <div>
        <div className={classes.contact}>
          <h2>Contact details</h2>
          <h2><button>Cancel</button></h2>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" ref={inputNameRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="photoUrl">Profile Photo URL:</label>
            <input type="text" id="photoUrl" ref={inputUrlRef} />
          </div>
          <div className={classes.actions}>
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
*/