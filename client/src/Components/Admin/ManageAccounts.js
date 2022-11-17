
import DataTable from "../../Components 2/DataTable"
import "../../CssFiles/manageacc.css"
import { useEffect, useState } from "react"
import axios from "axios"


const ManageAccounts = () => {

    //    const {fakeData} = useContext()
    const [account, setAccount] = useState([])
    const [render, setRender] = useState(false)
    const [edit, setEdit] = useState('')
    // const [editAcc, setEditAcc] = useEffect(false)
    useEffect(() => {
        const getDatatFromDB = async () => {
            const { data } = await axios.get("http://localhost:6001/admin/Accounts");
            setAccount(data)
            console.log(data)
        }
        getDatatFromDB()
    }, [render])


    const reRender = () => {
        setRender(!render)
    }
    const changeEditState = () => {
        setEdit(true)
    }

    return (

        <>
            <h2 className="ManageAccountH2">Manage Accounts</h2>

            {account.map((data) => (
                <DataTable key={data.user_id}
                    data={data} reRender={reRender}
                    edit={edit}
                    changeEditState={changeEditState}
                //  editAcc={editAcc} 
                //  setEditAcc={setEditAcc}
                />

            ))}
        </>
    )

}

export default ManageAccounts
// user_id SERIAL PRIMARY KEY NOT NULL,
//     userName TEXT,
//     accessRole TEXT,
//     campus_name TEXT,