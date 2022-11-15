
import DataTable from "../../Components 2/DataTable"
import "../../CssFiles/manageacc.css"
import { useEffect, useState } from "react"
import axios from "axios"


const ManageAccounts = () => {

//    const {fakeData} = useContext()
const [account, setAccount] = useState([])
   useEffect(() => {
const getDatatFromDB = async() => {
const {data} = await axios.get("http://localhost:6001/admin/Accounts");
setAccount(data)
console.log(data)
}
getDatatFromDB()
   }, [])

return (

    <div>
        <h2>Manage Accounts</h2>
<div className="Header">
    <div>UserName</div>
    <div>Email</div>
    <div>Access</div>
    <div>Campus</div>
</div>
        {account.map((data) => (
            <DataTable key={data.user_id} data={data}/>
           
        ))} 
    </div>
)

}

export default ManageAccounts
// user_id SERIAL PRIMARY KEY NOT NULL,
//     userName TEXT,
//     accessRole TEXT,
//     campus_name TEXT,