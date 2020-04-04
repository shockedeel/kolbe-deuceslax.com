import React from 'react';


class Fatality extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div>
                <h3>
                    Current Case Fatality Rate (Texas):
                </h3>
                <h5>{this.props.rate}%</h5>

            </div>
            
        );
    }
}



export default Fatality;