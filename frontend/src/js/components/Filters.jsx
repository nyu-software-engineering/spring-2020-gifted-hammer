import React, { useState } from 'react';
import '../../css/Filters.css'
import filterButton from '../../assets/filters.svg'
import loadingImage from '../../assets/loading.svg'
import EmotionFilters from '../util/Emotions'

const filterNames = ['popularity', 'tempo', 'energy', 'danceable', 'vocals', 'mood'];

function Filters(props) {
    const tempSliderVals = {};
    tempSliderVals['popularity'] = .5;
    tempSliderVals['tempo'] = .5;
    tempSliderVals['energy'] = .5;
    tempSliderVals['danceable'] = .5;
    tempSliderVals['vocals'] = .5;
    tempSliderVals['mood'] = .5;

    const [sliderValues, setSliderValues] = useState(tempSliderVals)

    const [faceImage, setFaceImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleSubmit = e => {
        const formData = new FormData()
        formData.append('face', faceImage)
      
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        // fetch(process.env.REACT_APP_SERVER+'/face', requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     const emotion = data.emotion.toLowerCase();
        //     setIsLoading(false);
        //     setSliderValues(EmotionFilters[emotion]);
        // });
        
        setIsLoading(true);

    }
    let handleChange = e => {
        e.persist();
        setSliderValues({ ...sliderValues, [e.target.id]: parseFloat(e.target.value) })
    }

    const handleImageUpload = e => {
        console.log(e.target.files);
        setFaceImage(e.target.files[0]);
    }

    let createSliders = () => {
        console.log(sliderValues);
        
        return (
            <div className={visible ? 'filterSliders visible' : 'filterSliders'}>
                <div class="labels">
                    <p className="low">low</p>
                    <div className="range-container">
                        <span className="left-arrow"></span>
                        <span className="right-arrow"></span>
                    </div>
                    <p className="high">high</p>
                </div>
                {
                    filterNames.map((filter, index) => (
                        <div className="filterSliderPair" key={filter}>
                           
                            <p>{filterNames[index]}</p>
                            <input className="filterSlider"
                                id={filter}
                                onChange={handleChange}
                                onMouseUp={props.sliderValueChanged}
                                onTouchEnd={props.sliderValueChanged}
                                value={sliderValues[filterNames[index]]}
                                type="range" min="0" max="1"
                                step=".01"
                                >
                            </input>

                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className={visible ? 'Filters visible' : 'Filters'}>
            <img className='filterButton' src={filterButton} onClick={e => setVisible(!visible)} alt='filter-sliders'/>
            {createSliders()}
        </div>
    )
}

export default Filters;