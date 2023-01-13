import React from "react";
const Web3 = require("web3");


 const TradesDetails=({TradeDetailsByIds,TradeByIds})=>{
    console.log(TradeByIds);
    console.log(TradeDetailsByIds);
     return( 
        <>
        <div className="app-details" style={{marginTop:'5px'}}>
        <h5>TRADE DETAILS BY INDEXED : </h5>
         {TradeDetailsByIds?.map(item=>{
            return <p>
            <br/>TradeNumber : {item[0]},
            <br/>AssetName : {item[1]},
            <br/>SellerAddress : {item[2]},
            <br/>BuyerAddress : {item[3]},
            <br/>Amount : {item[4]},
            <br/>LCHash : {item[5]},
            <br/>verifyLC : {item[6]},
            <br/>BLHash : {item[7]},
            <br/>verifyBL : {item[8]},
            <br/>AcceptTrade : {item[9]},
            <br/>TradeType : {item[10]}
            </p>     
        })}
        <br/>
        <h5>TRADE INDEXED :</h5>
        {TradeByIds?.map(item=>{
            return <p>{item}</p>
        })
        }
        </div>
        </>
        )
 }
 export default TradesDetails;