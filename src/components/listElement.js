import React from 'react';


class ListElement extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
               <tr>
                   <td>
                       {this.props.place}
                   </td>
                   <td>
                       {this.props.count}
                   </td>
                   <td>
                       {this.props.deaths}
                   </td>
               </tr> 

        );

    }

}

export default ListElement;