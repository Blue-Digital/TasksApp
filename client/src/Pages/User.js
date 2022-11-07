import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
const User = () => {
    const [image, setImage] = useState("")
    const [imageCrop, setImageCrop] = useState("")
    const handleChange = (e) =>{
        const file = e.target.files[0];
        if (file && file.type.substring(0,5) === "image") {
            setImage(file);
        } else {
            setImage(null)
        }
    }
    
    return (
        <>
            <h1>Welcome, user!</h1>
            <div className='profile_img text-center p-4'>
            <div className='flex flex-column justify-content-center align-items-center'>
            <img 
            style={{
                width: "200px",
                height:"200px",
                borderRadius: "50%",
                objectFit: "cover" ,
                border: "4px solid green",
            }}
            src={image} alt=""/>
            {/* <label htmlFor='' className='mt-3 font-semibold text-5x1'>placeHolder</label> */}
    <Dialog
     visible={imageCrop}
                header={() => (
                    <p htmlFor="" className='text-2x1 font-semibold textColor'>
                        Update Profile
                    </p>
                )}
                onHide={() => setImageCrop(false)}
    >



    </Dialog>
            
            <InputText 
            type="file" 
            accept='/image/*'
            onChange={handleChange}
            
            />

            </div>    
            </div>


        </>
    )
}

export default User