import {FC} from "react";
import Layout from "./Layout";
import {useAppSelector,useAppDispatch } from "./store";
import {changeValue,changeCost,initData} from "./store/slices/udataSlice";
import { getValue } from "./common";
// import {NormalClick,BuyAutoPowerUpgrade,BuyAutoRateUpgrade,BuyPowerUpgrade,loop,getValue,getCost,initUserData} from "./GameLogic"

const LandingPage: FC = () => {

// const _stats = localStorage.getItem("@STATS")

// if(!_stats){
//  var stats = [score,pw_lvl,pw_cost,auto_pw_lvl,auto_pw_cost,auto_rate_lvl,auto_rate_cost];
//  localStorage.setItem("@STATS", JSON.stringify(stats));
// }

const USER_DATA = [
  {
      id:"score",
      value:0,
  },
  {
      id:"power",
      value:1,
  },
  {
      id:"auto_power",
      value:1,
  },
  {
      id:"auto_rate",
      value:0,
  }
]

const dispatch = useAppDispatch();
const udata = useAppSelector((state) => state.udata.data);



const initUserData = () =>{
  USER_DATA.map((item)=>{
      dispatch(initData(item));
  })
  dispatch(changeCost({id:"power", cost:GetPowerCost(getValue(udata,"power"))}));
  dispatch(changeCost({id:"auto_power", cost:GetAutoPowerCost(getValue(udata,"auto_power"))}));
  dispatch(changeCost({id:"auto_rate", cost:GetAutoRateCost(getValue(udata,"auto_rate"))}));
}


const getCost = (id:string) => {
  return udata.find((item: any) => item.id === id)?.cost
}

const GetPowerCost = (level: number) => {
  return 10 * level;
};

const GetAutoPowerCost = (level: number) => {
  if (level) {
    return 10 * level;
  } else {
    return 5;
  }
};
const GetAutoRateCost = (level: number) => {
  if (level) {
    return 10 * level;
  } else {
    return 5;
  }
};

const GetAutoRate = (level:number) => {
  console.log(Math.exp(1/level))
  return (Math.exp(1/level));
};

const BuyPowerUpgrade = () => {
  dispatch(changeValue({id:"power", value:getValue(udata,"power")+1}));
  dispatch(changeValue({id:"score", value:getValue(udata,"score")-getCost("power")}));
  dispatch(changeCost({id:"power", cost:GetPowerCost(getValue(udata,"power"))}));
};

const BuyAutoPowerUpgrade = () => {
  dispatch(changeValue({id:"auto_power", value:getValue(udata,"auto_power")+1}));
  dispatch(changeValue({id:"score", value:getValue(udata,"score")-getCost("auto_power")}));
  dispatch(changeCost({id:"auto_power", cost:GetAutoPowerCost(getValue(udata,"auto_power"))}));
};

const BuyAutoRateUpgrade = () => {
  dispatch(changeValue({id:"auto_rate", value:getValue(udata,"auto_rate")+1}));
  dispatch(changeValue({id:"score", value:getValue(udata,"score")-getCost("auto_rate")}));
  dispatch(changeCost({id:"auto_rate", cost:GetAutoRateCost(getValue(udata,"auto_rate"))}));
};


const NormalClick = () => {
  dispatch(changeValue({id:"score", value:getValue(udata,"score")+getValue(udata,"power")}));
};

const AutoClick = () => {
  if (getValue(udata,"auto_rate") > 1){
    console.log(10000*GetAutoRate(getValue(udata,"auto_rate")));
    dispatch(changeValue({id:"score", value:getValue(udata,"score")+getValue(udata,"auto_power")}));
  }
};

function loop() {
  setTimeout(AutoClick,10000*GetAutoRate(getValue(udata,"auto_rate")));
}

if(!udata.length){
  initUserData();
}

  return (
    <Layout>
      <section className="hero">
        <p>{getValue(udata,"score")}</p>
        <button className="hero-action" onClick={() => NormalClick()}>
          Click
        </button>
        <div className="upgrade_list">
          <div className="upgrade">
            <button
              onClick={() => {
                if (getValue(udata,"score") >= getCost("power")) {
                  BuyPowerUpgrade();
                }
              }}
            >
              Power({getCost("power")}point)
            </button>
            <p>{getValue(udata,"power")}</p>
          </div>
          <div className="upgrade">
            <button
              onClick={() => {
                if (getValue(udata,"score") >= getCost("auto_power")) {
                  BuyAutoPowerUpgrade();
                }
              }}
            >
              Autoclick Power({getCost("auto_power")}point)
            </button>
            <p>{getValue(udata,"auto_power")}</p>
          </div>
          <div className="upgrade">
            <button
              onClick={() => {
                if (getValue(udata,"score") >= getCost("auto_rate")) {
                  BuyAutoRateUpgrade();
                }
              }}
            >
              Autoclick Rate({getCost("auto_rate")}point)
            </button>
            <p>{getValue(udata,"auto_rate")}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
