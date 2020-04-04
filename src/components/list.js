import React from 'react';
import ListElement from './listElement'
import API from '../api';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:null};
        this.api = new API();
        
        
        
        
    }
    componentDidMount(){
        this.api.getCsvData().then(dataCsv=>this.api.sortByCases(dataCsv)).then(sorted=>this.setState({data:sorted}));
        setInterval(()=>{
            this.api.getCsvData().then(dataCsv=>this.api.sortByCases(dataCsv)).then(sorted=>this.setState({data:sorted}));
        },1000*5*60);
    }
   
    render(){
        if(this.state.data==null){
       
        return(
            <table>
            <thead></thead>
              <tbody>
                
              </tbody>
              </table>
        );
        }
        else{
            return(
                <div className="scroll">
                <table style={{margin:'0px'}}>
                <thead><tr>
                    <td>
                        County
                    </td>
                    <td>
                        Cases
                    </td>
                    <td>
                        Deaths
                    </td>
                    </tr>
                    </thead>
                  <tbody>
                    {this.state.data.map((element,index)=><ListElement place={element[1]} count={element[7]} deaths={element[8]} key={index}/>)}
                  </tbody>
                  </table>
                  </div>
            );
        }
    }

}

export default List;