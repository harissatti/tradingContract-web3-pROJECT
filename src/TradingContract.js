import React, {useState} from "react";
import { tradingContract} from './data'
import TradesDetails from "./TradesDetails";

// const Web3 = require("web3");


const TradingContract = ({ web3Obj, userInfo }) => {
  const [tradeId, setTradeId]=useState("");
  const [assetName, setAssetName]=useState("");
  
  const [address, setAddress]=useState("");
  const [hash, setHash]=useState("");
  const [amount, setAmount]=useState("");
  const [tradeType, setTradeType]=useState("");
  const [role, setRole]=useState("");
  const [uri, setUri]=useState("");
  const [tradeByIds,setTradeByIds]=useState([]);
  const [tradeDetailsByIds,setTradeDetailsByIds]=useState([]);
 
  const tradeIdValues=(e)=>{
    setTradeId(e.target.value);
  };
  const assetNameValues=(e)=>{
    setAssetName(e.target.value);
  };
  
  {/* adding addresses of trader ,buyers,sellers */}

  const addressValues=(e)=>{
    setAddress(e.target.value);
  }

  const hashValues=(e)=>{
    setHash(e.target.value);
  }
  const amountValues=(e)=>{
    setAmount(e.target.value);
  }
  const tradeTypeValues=(e)=>{
    setTradeType(e.target.value);
  }
  {/* adding roles for trader ,buyers,sellers */}
  const roleValues=(e)=>{
    setRole(e.target.value);
  }
  const uriValues=(e)=>{
    setUri(e.target.value);
  }
  
 
  
  const onSellerRole = async(e)=>{ // ! checking Seller role
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(tradingContract.ABI,tradingContract.contractAddress)
    console.log(methods,"method");
    const result=await methods.methods.SELLER_ROLE().call();
    console.log(result);
    window.alert(result);
  }
  const onTraderRole = async(e)=>{ // ! checking Auctioner role
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(tradingContract.ABI,tradingContract.contractAddress)
    const result=await methods.methods.TRADER_ROLE().call();
    console.log(result);
    window.alert(result);
  }
  const onBuyerRole = async(e)=>{ // ! checking Auctioner role
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(tradingContract.ABI,tradingContract.contractAddress)
    const result=await methods.methods.BUYER_ROLE().call();
    console.log(result);
    window.alert(result);
  }

  {/* adding roles for trader as trader,buyers as buyers role,sellers as seller Role*/}

  const onGrantRole = async (e) => { // ! Grant role 
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.grantRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };

  
  {/* Checking roles of trader has role  as trader,buyers as buyers role,sellers as seller Role*/}

  const onHasRole = async (e) => { // ! Checking role
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.hasRole(role,address).call();
    console.log(result);
    window.alert(result);
    setRole("");
    setAddress("");
  };

   {/* removing  roles of trader as trader,buyers as buyers role,sellers as seller Role*/}

   const onRevokeRole = async (e) => { // ! Revoke role
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.revokeRole(role,address).send({
      from: userInfo.account,
      
    })
    console.log(result)
    setRole("");
    setAddress("");
  };

{/*creating order of seller buyer and trader  */}

  const onCreateOrder = async (e) => { // ! Creating Trade
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.createOrder(tradeId, assetName, address, amount, tradeType).send({
      from: userInfo.account,
    })
    console.log(result)
    setTradeId("");
    setAssetName("");
    setAddress("");
    setAmount("");
    setTradeType("");
  };

  {/* **********Details of Order  for buyer,seller,Trader*************** */}
  const onTradingDetails = async (e) => { // ! Getting Trade Details
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.OrderDetails(tradeId).call();  
    console.log(result);
    console.log("SellerAddress : "+result[0]);
    console.log("BuyerAddress: "+result[1]);
    console.log("Amount: "+result[2]);
    console.log("LCHash : "+result[3]);
    console.log("BLHash : "+result[4]);
    console.log("verifyLC : "+result[5]);
    console.log("verifyBl : "+result[6]);
    console.log("acceptTrade : "+result[7]);
    window.alert([
    "SellerAddress : "+result[0],
    "BuyerAddress : "+result[1],
    "Amount : "+result[2],
    "LCHash : "+result[3],
    "BLHash : "+result[4],
    "verifyLC : "+result[5],
    "verifyBl : "+result[6],
    "acceptTrade : "+result[7]
    ]);
  };

  {/* **********Agree for Trading  Function *************** */}

  const onAgreeToTrade = async (e) => { // ! Agree to Trade
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.agreeToTrade(tradeId).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
  };

  {/* **********Update LC*************** */}
  const onUpdateLC = async (e) => { // ! Update LC
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.updateLC(tradeId, hash).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
    setHash("");
  };

  {/* **********Verify LC*************** */}

   const onVerifyLC = async (e) => { // ! Verify LC
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.verifyLC(tradeId,hash).send({
      from: userInfo.account,
  });
  console.log(result)
  setTradeId("");
  setHash("");
  };

  {/* **********Update BL*************** */}
  const onUpdateBL = async (e) => { // ! Update BL
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.updateBL(tradeId, hash).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
    setHash("");
  };

  {/* **********Verify BL*************** */}

  const onVerifyBL = async (e) => { // ! Verify BL
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.verifyBL(tradeId,hash).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
    setHash("");
  };
  const onUpdateBaseUri = async (e) => { // ! Set Trade Hash
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.updateBaseUri(uri).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
  };
  const onGetTradingHash = async (e) => { // ! Get Trade Hash 
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingContract.ABI, tradingContract.contractAddress)
    const result = await methods.methods.getAllHash(tradeId).call();
    
    console.log("LCHash : "+result[0]);
    console.log("verifyLC : "+result[1]);
    console.log("BLHash : "+result[2]);
    console.log("verifyBl : "+result[3]);
    
    window.alert([
    "LCHash : "+result[0],
    "verifyLC : "+result[1],
    "BLHash : "+result[2],
    "verifyBl : "+result[3],
    ]);
    setTradeId("");
  };
  const onGetAllTradingIdsDetails=async(e)=>{ // Getting all Trade ids Details
    e.preventDefault();
    console.log(tradingContract.ABI);
    var methods=new web3Obj.eth.Contract(tradingContract.ABI,tradingContract.contractAddress)
    const result1=await methods.methods.allTradingNumbers().call();
    const result2=await methods.methods.batchDetailsTrades(result1).call();

    setTradeDetailsByIds(result2);
    setTradeByIds(result1);
  }


  return (
    <>
    <h3>Trading With Crypto Contract</h3>
      <form className="marginTop" onSubmit={onSellerRole}>
        <div className="app-details">
          <h5>Seller Role</h5>
        </div>
        <button className="marginTop">Seller Role details</button>
      </form>
      <form className="marginTop" onSubmit={onTraderRole}>
        <div className="app-details">
          <h5>Trader Role</h5>
        </div>
        <button className="marginTop">Trader Role details</button>
      </form>

      <form className="marginTop" onSubmit={onBuyerRole}>
        <div className="app-details">
          <h5>Buyer Role</h5>
        </div>
        <button className="marginTop">Buyer Role details</button>
      </form>

      {/* **********Granting Role to Trader ,seller ,Buyer*************** */}

      <form className="marginTop" onSubmit={onGrantRole}>
        <div className="app-details">
          <h5>Grant Role Function</h5> 
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValues} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Grant Role</button>
      </form>

      {/* **********Checking Role to Trader ,seller ,Buyer*************** */}

      <form className="marginTop" onSubmit={onHasRole}>
        <div className="app-details">
          <h5>Has Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValues} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Check Role</button>
      </form>

      {/* **********Revoke Role to Trader ,seller ,Buyer*************** */}
      <form className="marginTop" onSubmit={onRevokeRole}>
        <div className="app-details">
          <h5>Revoke Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValues} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Revoke Role</button>
      </form>

      {/* **********Create Order  for buyer,seller,Trader*************** */}
      <form className="marginTop" onSubmit={onCreateOrder}>
        <div className="app-details">
          <h5>Create Trade Function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br />
          <label htmlFor="assetName">Asset Name</label>
          <input type="text" value={assetName} onChange={assetNameValues} />
          <br />
          <label htmlFor="address">Wallet Address</label>
          <input type="text" value={address} onChange={addressValues} />
          <br />
          <label htmlFor="amount">Trade Amount</label>
          <input type="text" value={amount} onChange={amountValues} />
          <br />
          <label htmlFor="tradeType">Trade Type</label>
          <input type="text" value={tradeType} onChange={tradeTypeValues} />
          <br />
          </div>
        <button className="marginTop">Create Trade</button>
      </form>

      {/* **********Details of Order  for buyer,seller,Trader*************** */}

      <form className="marginTop" onSubmit={onTradingDetails}>
        <div className="app-details">
          <h5>Trade Details Function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Trade Details</button>
      </form>
      <form className="marginTop" onSubmit={onAgreeToTrade}>
        <div className="app-details">
          <h5>Agree To Trade function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Agree to Trade</button>
      </form>

      {/**************************Update LC ************************ */}

      <form className="marginTop" onSubmit={onUpdateLC}>
        <div className="app-details">
          <h5>Add LC hash function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br/>
          <label htmlFor="hash">Trade Hash</label>
          <input type="text" value={hash} onChange={hashValues} />
        </div>
        <button className="marginTop">LC hash</button>
      </form>
      {/**************************Verify LC ************************ */}
      
      <form className="marginTop" onSubmit={onVerifyLC}>
        <div className="app-details">
          <h5>Verify LC function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br/>
          <label htmlFor="hash">Trade Hash</label>
          <input type="text" value={hash} onChange={hashValues} />
        </div>
        <button className="marginTop">Verify LC</button>
      </form>

      {/**************************Update BL************************ */}

      <form className="marginTop" onSubmit={onUpdateBL}>
        <div className="app-details">
          <h5>Add BL hash function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br/>
          <label htmlFor="hash">Trade Hash</label>
          <input type="text" value={hash} onChange={hashValues} />
        </div>
        <button className="marginTop">BL hash</button>
      </form>

      {/**************************Verify BL************************ */}

      <form className="marginTop" onSubmit={onVerifyBL}>
        <div className="app-details">
          <h5>Verify BL function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br/>
          <label htmlFor="hash">Trade Hash</label>
          <input type="text" value={hash} onChange={hashValues} />
        </div>
        <button className="marginTop">Verify BL</button>
      </form>


      <form className="marginTop" onSubmit={onUpdateBaseUri}>
        <div className="app-details">
          <h5>Update Base Uri function</h5>
          <label htmlFor="uri">Upadate uri</label>
          <input type="text" value={uri} onChange={uriValues} />
        </div>
        <button className="marginTop">Update Uri</button>
      </form>
      <form className="marginTop" onSubmit={onGetTradingHash}>
        <div className="app-details">
          <h5>Get ALL Uri of trade</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Get Uri</button>
      </form>
      <form className="marginTop" onSubmit={onGetAllTradingIdsDetails}>
        <div className="app-details">
          <h5>Get All Trades</h5>
        </div>
        <button className="marginTop">All Trading Details</button>
      </form>
      <TradesDetails TradeDetailsByIds={tradeDetailsByIds} TradeByIds={tradeByIds} />
    
    </>
  )
}
export default TradingContract;