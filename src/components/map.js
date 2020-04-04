import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl'
import API from '../api';
import Fatality from './fatality';


class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            viewport:{
            latitude:32.779167,
            longitude:-96.808891,
            zoom:5,
            width: '50vw',
            height: '50vh'
            
            }
        };
        this.api=new API();
        

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
            <ReactMapGL {...this.state.viewport} mapboxApiAccessToken="pk.eyJ1Ijoic2hvY2tlZGVlbCIsImEiOiJjazg5ZG4xeW8wNXhhM25ucndrOXpiZzFnIn0.9vpwj7if8eGoqtUffGe9RA"
            onViewportChange={newViewport=>this.setState({viewport:newViewport})} className="map">
                Hello
            </ReactMapGL>
        );
        }
        else{
            return(
                <div>
                <ReactMapGL {...this.state.viewport} mapboxApiAccessToken="pk.eyJ1Ijoic2hvY2tlZGVlbCIsImEiOiJjazg5ZG4xeW8wNXhhM25ucndrOXpiZzFnIn0.9vpwj7if8eGoqtUffGe9RA"
                onViewportChange={newViewport=>this.setState({viewport:newViewport})}>
                    {this.state.data.map(element=><Marker key={element[0]} latitude={parseFloat(element[5])} longitude={parseFloat(element[6])}>
                    
                    <img src={require('./red_dot.png')} />
                        </Marker>)}
                </ReactMapGL>
                <Fatality rate={this.api.getFatalityRateTx(this.state.data)}/>
                </div>



            );
        }
    }

}
export default Map;