import DishTab from "./DishTab.js";
import dishesList from "./foodLists/dailies.js";
import MenuItem from "./MenuItem.js";
import OrderFormItem from "./OrderFormItem.js";
import salads from "./foodLists/salads.js";
import hotDishes from "./foodLists/hots.js";
import coldDishes from "./foodLists/colds.js";
import drinks from "./foodLists/drinks.js";
import { useSelector, useDispatch } from "react-redux";
import { toggleOrder } from "../actions.js";
export default function Header(props) {
  const dispatch = useDispatch();
  const orderArray = useSelector((state) => {
    return state.shoppingReducer;
  });
  let menuItems = [
    { title: "SALADS", dishes: salads },
    { title: "HOT DISHES", dishes: hotDishes },
    { title: "COLD DISHES", dishes: coldDishes },
    { title: "DRINKS", dishes: drinks },
    { title: "FAST FOOD", dishes: salads },
  ];

  let menu = menuItems.map((element, index) => (
    <MenuItem {...element} key={index + "menu"} />
  ));
  let dishes = dishesList.map((element, index) => (
    <DishTab {...element} class={"dishTabDaily"} key={index} id={element.key} />
  ));

  function displayOrder() {
    dispatch(toggleOrder());
  }

  return (
    <main>
      {/*DAILY DISHES*/}
      <div className="dishes">{dishes}</div>
      {/*Order form on the right*/}
      <div className="orderForm">
        <div className="currentOrder">
          CURRENT ORDER:
          {orderArray.map((element, index) => (
            <OrderFormItem
              key={index + "order"}
              price={element.price}
              title={element.title}
              amount={element.amount}
              class="orderItemSide"
            /> //use KEY or maybe ID to later target specific element for removal
          ))}
          <div className="total">
            {orderArray.reduce((previous, next) => {
              let result =
                parseFloat(previous) + next.price * parseFloat(next.amount);
              result = parseFloat(result);
              result = result.toFixed(2);
              return result;
            }, 0)}
            €
          </div>
          <br />
          <button className="orderButton" onClick={displayOrder}>
            ORDER
          </button>
        </div>
      </div>

      {/*BOTTOM MENU*/}
      <div className="menu">
        <div className="menuTitle">MENU</div>
        {menu}
      </div>
    </main>
  );
}
