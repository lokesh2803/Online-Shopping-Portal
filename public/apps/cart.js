

exports.RemoveFromCart=function RemoveFromCart(username,productname,callback){
    var db_con=require('./dbconnection');
    var sql='select * from cart where customername=?';
    db_con.query(sql,[username],function(err,result,fields){
        if(err) throw err;
        
        var products;
        for(let i=0;i<result.length;i++){
            if(result[i].customername==username){
                username=result[i].customername;
                products=result[i].cartproducts;
            }
        }
        
        productname="$"+productname+"$";
        let index=products.indexOf(productname);
        products=products.substring(0,index)+""+products.substring(index+productname.length);
        var sql2='update cart set cartproducts=? where customername=?';
        db_con.query(sql2,[products,username],function(err,result,fields){
            if(err) throw err;
            console.log("Successfully updated cart");
        })
    });
}

function RemoveFromCart(product_id){
    var form=document.getElementById("form");
    var ID = document.createElement("input");
    ID.setAttribute("type", "text");
    ID.setAttribute("name", "productName");
    ID.setAttribute("value",product_id);
    ID.setAttribute("placeholder", "E-Mail ID");
    ID.style.display="none";
    form.append(ID); 
    document.getElementById("reload").click();
}

function increaseQuantity(Qtybox_id,productprice){
    var value=parseInt(document.getElementById(Qtybox_id).value);
    value++;
    value=isNaN(value) ? 1 : value;
    document.getElementById(Qtybox_id).value=value;
    var total=document.getElementById("totalamount").value;
    var text=total.split('.');
    var amount=parseInt(text[1]);
    amount+=parseInt(productprice);
    total=text[0]+"."+amount;
    document.getElementById("totalamount").value=total;
}

function decreaseQuantity(Qtybox_id,productprice){
    var value=parseInt(document.getElementById(Qtybox_id).value);
    value--;
    if(value<1)
        return;
    value=(isNaN(value) || value<1) ? 1 : value;
    document.getElementById(Qtybox_id).value=value;
    var total=document.getElementById("totalamount").value;
    var text=total.split('.');
    var amount=parseInt(text[1]);
    amount-=parseInt(productprice);
    total=text[0]+"."+amount;
    document.getElementById("totalamount").value=total;
}