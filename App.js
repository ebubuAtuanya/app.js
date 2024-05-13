import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import './App.css';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import ParticlesComponent from './Components/Particles/Particle';
import  'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';


// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = 'f6549e19ac4d49f2a4fc4d6c6a0d9881';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'cdba08f2de0b4fe0bf5a74d7aa7da68b' + {PAT}
    },

};







class App extends Component {
	constructor(){
		super();
		this.state ={
			input: '',
            imageUrl: '',
            "user_id":{ USER_ID},
           "app_id":{APP_ID},
           box: {},
                
          

        }
           }
    
 


		

		displayFaceBox=(box)=>{
			this.setState({box:box})
		}	

	
	onInputChange = (event)=>{
		this.setState({input:event.target.value});


	}

	onButtonSubmit = (result)=>{

		this.setState({imageUrl:this.state.input});
		fetch(this.state.input +{ MODEL_ID} + "/versions/" +{ MODEL_VERSION_ID} +"/outputs" ,{requestOptions})
    .then(response =>this.displayFaceBox (response))
    .then(result => {

        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

                 
            });
        });

    })
    .catch(error => console.log('error', error));

	}
        
render() {
		return(
			<div className='App'>
			<Navigation/>
			<Logo/>
			<Rank/>
			<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			{/*<ParticlesComponent className=''/>*/}
			<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
			</div>


			);
	}
}

	export default App;
