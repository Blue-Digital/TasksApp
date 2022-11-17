
import axios from "axios"
import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { FaPencilAlt } from "react-icons/fa"
import Manage from "../Portals/ManageInput"



const DataTable = ({ data, reRender, edit, changeEditState, editAcc, setEditAcc }) => {
    // console.log(data)
    const [open, setOpen] = useState(false)
    
const handleEdit = () => {
changeEditState()
}

    const  handledelete = async (id) => {
        await axios.delete(`http://localhost:6001/admin/Account/delete/${id}`)
        reRender()
        // console.log(id)
// console.log(data.user_id)
    }
    return (
        <>
            
                <div id={data.user_id} className="Data_Table">
                <table className="AccountTable">
                        <thead>
                        <tr>
                            <th className="UserNameData" scope="col">User Name</th>
                            <th className="EmailData" scope="col">Email</th>
                            <th className="RoleData" scope="col">Role</th>
                            <th className="CampusData" scope="col">Campus</th>
                            <th className="EditAndDelete" scope="col"></th>
                            <th className="EditAndDelete" scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="AccountTableCells">{data.username}</td>
                            <td className="AccountTableCells">{data.email}</td>
                            <td className="AccountTableCells">{data.accessrole}</td>
                            <td className="AccountTableCells">{data.campus_name}</td>
                            
                            <td ><FaPencilAlt /></td> 
                            
                            <Manage edit={edit} editAcc={editAcc} setEditAcc={setEditAcc} open={open} close={() => setOpen(false)}/>
                            <td onClick={() => {handledelete(data.user_id)}} ><BsTrash /></td>
                        </tr>
                        <tr>

                        </tr>
                        </tbody>
                    </table>
                    <button onClick={() => setOpen(true)}>test</button>
                    </div>

                    
                


        </>
    )
}


export default DataTable
// /admin/Accounts
// onClick={handleEdit(data.user_id)