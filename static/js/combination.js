/*
 * @Author: wuhao 
 * @Date: 2019-01-09 17:25:23 
 * @Desc: 1,2,3,4,...,n 组成三位数,每位都不相同,可以有多少个
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-09 17:38:14
 */

combination1(8)
 function combination1(n){
   var num=0
   console.time('计算')
   for(var x=1;x<=n;x++){
     for(y=1;y<=n;y++){
       if(x!=y){
         for(z=1;z<=n;z++){
           if(z!=x&&z!=y){
             num++;
             console.log(''+x+y+z)
           }
         }
       }
     }
   }
   console.log('一共'+num+'个')
   console.timeEnd('计算')
 }