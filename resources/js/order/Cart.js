import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'





function Cart(){

    const [cartItems, setCartItems] = useState("")
   // const [clearOrder, setClearOrder] = useState(false)
    const [money, setMoney] = useState('sold/item')

    const MySwal = withReactContent(Swal)
    

    async function fetchCartItems(){
        const response = await fetch('/api/order')
        const data = await response.json()
       // console.log(data)
        setCartItems(data)
    }

    useEffect(()=>{
        fetchCartItems()
    }, [])

    async function cleanOrders(){        
        const response = await fetch(`/api/sold/item`)
        const data = await response.json()
        
    }

    async function noMoney(){        
        const response = await fetch(`/api/notsold/item`)
        const data = await response.json()
        
    }

    return(
        cartItems.length ?
        <div className="Cart">
          
        
             {cartItems.map((item, index) => (
            
            <div  key={index} className="ImageText">
                
                    <div className="ItemPrice">
                        <h2>{item.item.name}</h2>
                        <h2>{item.item.price}</h2>
                    </div>
                
                <img src={item.item.image}/>
                
            </div>
            
            
        ))}
         <button
         onClick ={ () =>{
            const Number = Math.random() 
            if(Number > 0.5){
               cleanOrders()
            }else{
                noMoney()
                MySwal.fire("Nice try!", 
                "You are not that rich")
            }        
             
             fetchCartItems()
             fetchCartItems()   
                   
            }
        }
         >Purchase</button>
      </div>
      :
      <div></div>

    )
}
export default Cart;