import React, {useState} from 'react'
import { Text, useNavigate } from 'zmp-ui';
import { appColors } from "../../constants/appColors";
import { AppFont } from "../../constants/app-font";
import ButtonCompeted from "../button/button-competed"

const SelectedComponent = () =>{
    const navigate = useNavigate();
    const [selected, setSelectedItem] = useState("");
    const [encodedName1,setEncodeName1]=useState('')
    const handleItemClick = (item:string) => {
        setSelectedItem(item)
        const name = data.find(value => value.id === item)
        const name1:any = name?.number
         setEncodeName1(encodeURIComponent(name1));
        
    }
    
    const data = [
        {
            id: "1",
            number: "10 Số",
            title: "May Mắn Nhất"
        },
        {
            id: "2",
            number: "50 Số",
            title: "May Mắn Nhất"
        },
        {
            id: "3",
            number: "100 Số",
            title: "May Mắn Nhất"
        }

    ]
    
    return(
       <div className='flex flex-col items-center'>
        <div>
        {data.map((item, index) => (
            <div onClick={()=> handleItemClick(item.id)}  style={{
                borderColor: selected === item.id ? appColors.primary : appColors.primary,
                backgroundColor: selected === item.id ? appColors.primary : 'transparent',
                color: selected === item.id ? appColors.secondary : appColors.secondary,
                fontFamily: AppFont.QuicksanSemibold,
                borderRadius: '40px'
                 }}
                className='flex flex-col w-full h-24  mt-10 border-4 p-10  justify-center items-center '>

            <Text style={{
             textAlign: 'center',
             color: selected === item.id ? appColors.secondary : appColors.primary,
             fontFamily: "SfusouvenirBold",
             fontSize: '35px',
             lineHeight: '1',
             fontWeight: 700
            }}>{item.number}</Text>

            <Text style={{
             textAlign: 'center',
             color: selected === item.id ? appColors.secondary : appColors.primary,
             fontFamily: "SfusouvenirBold",
             fontSize: '25px',
             fontWeight: 700
            }}>{item.title}</Text>

            
         </div>
         
        ))}

        </div>
        
        <div className='mt-10'>
            <ButtonCompeted title='Tiếp tục' onClick={()=>{
                navigate(`/create-gift?name1=${encodedName1}`);

            }}/>
        
        </div>
        
       </div>
    )
}
export default SelectedComponent;