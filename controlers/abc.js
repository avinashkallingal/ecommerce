var arr=[1,2,9,8]
var ans=[1,2,3,4,5,6,7,8,9]
for(let i=0;i<10;i++){
    for(let j=0;j<ans.length;j++){
        if(arr[i]==ans[j]){
            ans.splice(j,1)
            
        }
        
    }
}
console.log(" answer="+ans)