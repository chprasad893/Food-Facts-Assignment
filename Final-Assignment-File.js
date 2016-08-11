var count=0;
var countries1,countries2,sugar,salt,fat,carbos,protein;
var consumption1=[],consumption2=[];
var required_Countries1=['Netherlands','Canada','United Kingdom','Australia','Germany','Spain','South Africa','France'];
var required_Countries2=["United Kingdom", "Denmark", "Sweden","Norway","France", "Belgium", "Germany", "Switzerland", "Netherlands","Portugal", "Greece", "Italy", "Spain", "Croatia", "Albania"];

var sugarSum=[0,0,0,0,0,0,0,0];
var saltSum=[0,0,0,0,0,0,0,0];
var obj1={},obj2={};
var flag1=-1,flag2=-1;

var fatSum=[0,0,0];
var carbosSum=[0,0,0];
var proteinSum=[0,0,0];

var j=-1;


const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('FoodFacts.csv')
});

rl.on('line', function (line) {

 var Data1=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

 countries=Data1[33];   // index of countries in csv is 33
 sugar=Data1[102];     // index of sugar in csv is 102
 salt=Data1[116];     // index of salt in csv is 116
 fat=Data1[65];
 carbos=Data1[101];
 protein=Data1[112];

 for(var i=0;i<8;i++){
        if(countries===required_Countries1[i]){
             if(sugar!=='' && salt!==''){

                   sugarSum[i]=sugarSum[i]+parseFloat(sugar);
                   saltSum[i]=saltSum[i]+parseFloat(salt);
                   count++;
                 }

                 if(consumption1.length===0){
                               var obj1={};
                                      obj1['country']=countries;
                                      obj1['sugar']=sugarSum[i];
                                      obj1['salt']=saltSum[i];
                                      consumption1.push(obj1);
                             }

             else if(consumption1.length>0){
               for(var j=0;j<consumption1.length;j++){

                     if(consumption1[j].country===countries  ){
                       flag1=j;
                       break;
                     }
                   }
                if(flag1>=0){
                           consumption1[flag1].sugar=sugarSum[i];
                           consumption1[flag1].salt=saltSum[i];
                           flag1=-1;
                }
                else if(flag1===-1){

                            var obj1={};
                        obj1['country']=countries;
                        obj1['sugar']=sugarSum[i];
                        obj1['salt']=saltSum[i];
                        consumption1.push(obj1);

                }
             }
           }//end of required contries
    }//end of lopp to check countries Var i

    for(var i=0;i<15;i++){
     if(countries===required_Countries2[i]){

       if(i>=0 && i<=3){
         countries='North Europe';
         k=0;
       }
       else if(i>=4 && i<=8){
         countries='Central Europe';
         k=1;
       }
       else if(i>=9 && i<=14){
         countries='South Europe';
         k=2;
       }

    if(fat!=='' && carbos!=='' && protein!==''){
      fatSum[k]=fatSum[k]+parseFloat(fat);
      carbosSum[k]=carbosSum[k]+parseFloat(carbos);
      proteinSum[k]=proteinSum[k]+parseFloat(protein);
     }

     if(consumption2.length===0){
                   var obj2={};
                          obj2['country']=countries;
                          obj2['fat']=fatSum[k];
                          obj2['carbohydrate']=carbosSum[k];
                          obj2['protein']=proteinSum[k];
                          consumption2.push(obj2);
                 }

    else if(consumption2.length>0){
    for(var k=0;k<consumption2.length;k++){

         if(consumption2[k].country===countries  ){
           flag2=k;
           break;
         }
       }
    if(flag2>=0){
               consumption2[flag2].fat=fatSum[k];
               consumption2[flag2].carbohydrate=carbosSum[k];
               consumption2[flag2].protein=proteinSum[k];
               flag2=-1;
    }
    else if(flag2===-1){

      var obj2={};
             obj2['country']=countries;
             obj2['fat']=fatSum[k];
             obj2['carbohydrate']=carbosSum[k];
             obj2['protein']=proteinSum[k];
             consumption2.push(obj2);
             }
           }
         }
    }
 });



 rl.on('close', function() {
 var file1= JSON.stringify(consumption1);
 fs.writeFile('File-1.json',file1,function(){console.log("File-1 Generated")});
 var file2= JSON.stringify(consumption2);
 fs.writeFile('File-2.json',file2,function(){console.log("File-2 Generated")});
 });
