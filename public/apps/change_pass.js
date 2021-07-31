function validate() {
    document.getElementById("oldpass").style.display="none";
    document.getElementById("wrongpass").style.display="none";
    var x= document.getElementById("pass1").value;
    if(x.length==0)
    document.getElementById("popup").style.display="none";
    if(x.length>0 && x.length<8)
        document.getElementById("popup").style.display="block";
    
     if(x.length>=8){
        var valid=[false,false,false,false];
         for(let i=0;i<x.length;i++){
             if(x[i]>='A' && x[i]<='Z'){
                 valid[0]=true;
             }
             else if(x[i]>='a' && x[i]<='z'){
                 valid[1]=true;
             }
             else if(x[i]>='0' && x[i]<='9'){
                 valid[2]=true;
             }
             else{
                 valid[3]=true;
             }
         }
         for(let i=0;i<valid.length;i++){
             if(valid[i]==false){
                document.getElementById("popup").style.display="block";
                return;
            }
         }
         document.getElementById("popup").style.display="none";
     }
  }

  function validate1(){
    document.getElementById("oldpass").style.display="none";
    document.getElementById("wrongpass").style.display="none";
      var x=document.getElementById("pass1").value;
      var y=document.getElementById("pass2").value;
      if(y.length==0){
        document.getElementById("popup1").style.display="none";
      }
      if(y.length>0){
      if(x==y){
        document.getElementById("popup1").style.display="none";
      }
      else{
        document.getElementById("popup1").style.display="block";
      }
    }
  }

module.exports=function validatePass(x,y,callback) {
            if(x!=y)
                callback(false);
            else{
            if(x.length==0)
                callback(false);
            else if(x.length>0 && x.length<8)
            callback(false);
            
           else{
                var valid=[false,false,false,false];
                for(let i=0;i<x.length;i++){
                    if(x[i]>='A' && x[i]<='Z'){
                        valid[0]=true;
                    }
                    else if(x[i]>='a' && x[i]<='z'){
                        valid[1]=true;
                    }
                    else if(x[i]>='0' && x[i]<='9'){
                        valid[2]=true;
                    }
                    else{
                        valid[3]=true;
                    }
                }
                for(let i=0;i<valid.length;i++){
                    if(valid[i]==false){
                        callback(false);
                    }
                }
                callback(true);
            }
        }
    }