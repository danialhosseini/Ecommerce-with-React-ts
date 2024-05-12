import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "../Components/CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import StoreItems from "../data/items.json";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}:ShoppingCartProps) {
    const {closeCart , cartItems} = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>cart</Offcanvas.Title>
      </Offcanvas.Header>   
      <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item =>(
                    <CartItem key = {item.id}{...item}/>
                ))}
                <div className="ms-auto fw-bold fs-5">Total: {formatCurrency(cartItems.reduce(
                    (total,cartItems)=> { const item = StoreItems.find(i => i.id === cartItems.id)
                        return total + (item?.price|| 0) * cartItems.quantity
                },0))}</div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  );
}
