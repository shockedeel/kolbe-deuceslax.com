
class API{

    getCsvData(filename=this.getFilenameForRequest()){
        function chainError(err) {
            return Promise.reject(err)
          };
       var _this = this;
       return new Promise(function(resolve,reject){
        fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${filename}`)
        .then(response=>{
            if(response.status==404){
                console.log("Did not find todays stats checking for yesterdays...");
                var fileDayBefore=_this.getFilenameForRequest(true);
                fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${fileDayBefore}`)
                .then(response=>response.text()).then(text=>text.split('\n')).then(arry=>{
                    var returnedArray = [];
                    for (var i=0;i<arry.length;i++){
                        returnedArray[i]=arry[i].split(",")
                        
                    }
                    return returnedArray;
                }).then(formatted=>_this.getTexasFromFormattedData(formatted)).then(texas=>resolve(texas));
                
                return response.reject;
            }
            else{
                console.log("RESPONSE IS TODAY");
                return response;
            }
            
        }).then(response=>response.text()).catch(e=>console.log(e)).then(text=>text.split('\n')).catch(e=>console.log(e)).then(arry=>{
            var returnedArray = [];
            for (var i=0;i<arry.length;i++){
                returnedArray[i]=arry[i].split(",")
            }
            
            return returnedArray;
        }).catch(e=>console.log(e)).then(formatted=>_this.getTexasFromFormattedData(formatted)).catch(e=>new Promise.reject()).then(texas=>resolve(texas),benShapiroIsStupid=>console.log("haha"));
    }); 
        
}
    sortByCases(arr){
        arr.sort(function(a,b){return b[7]-a[7]});
        return arr;
    }
    getFilenameForRequest(getDayBefore=false){
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        if(getDayBefore===true){
            day-=1;
        }
        if(day<10){
            day = "0"+day;
        }
        if(month<10){
            month = "0"+month;
        }
        return month+'-'+day+'-'+year+".csv";
    }
    getTexasFromFormattedData(formatted){
        var texasData = [[]];
        var iterator = 0;
        for(var i=0;i<formatted.length;i++){
            if((formatted[i][2]==='Texas')&&formatted[i][7]>0&&formatted[i][1]!='Unassigned'){
                texasData[iterator]=formatted[i];
                iterator++;
            }
            

        }
        return texasData;
    }
    getFatalityRateTx(data){
        //this is for case fatality rate
        
        let numCases=0;
        let numDeaths=0;
            for(let i=0;i<data.length;i++){
                numCases+=parseInt(data[i][7]);
                numDeaths+=parseInt(data[i][8]);

            }
            
        return (Math.round((numDeaths/numCases)*10000)/1000)*10
    }

}



export default API;