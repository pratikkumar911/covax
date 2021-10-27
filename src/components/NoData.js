import React from 'react';
import styled from 'styled-components';
import image1 from '../assets/No data-pana.png';

const ImageContainer = styled.div`
    width:100%;
    text-align: center;
    height: 293px;
`;
const MessageData = styled.div`
    width:100%;
    text-align: center;
    padding: 10px;
    font-weight: bold;
`;

const NoData = () =>{
    return (
        <div>
            <ImageContainer>
                <img src={image1} style={{objectFit:'cover', height:'100%'}} alt='No Data image'/>
            </ImageContainer>
            <MessageData>
                No results found for entered state, Pin code or Date. Please try again
            </MessageData>
        </div>
    )
};

export default NoData

