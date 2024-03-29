import styled, {css} from 'styled-components';

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
    justify-content: center;
    background: transparent;

    ${
        (props) => 
            props.primary && css
                `background: #5cb85c`
    }

    ${
        (props) => 
            props.secondary && css 
                `background: #62b1f6`       
    }
    ${
        (props) => 
            props.dark && css
                `background: #141414`       
    }

    ${
        (props) => 
            props.rennaissance && css
                `background: #d4af37`       
    }
    ${
        (props) => 
            props.danger && css
                `background: #f40105`       
    }

    ${
        (props) => 
            props.large && css
                `width: 135px`       
    }

    ${
        (props) => 
            props.meduim && css
                `width: 100px`       
    }
    
    ${
        (props) => 
            props.small && css
                `width: 25px` && css `height: 20px`      
    }   

    ${
        (props) => 
            props.subscribe && css 
            `background: none` && css 
            `border: none`       
    }   

    ${
        (props) => 
            props.loadMore && css 
            `background: none` && css 
            `border: 1px solid #141414`       
    }   
`;


export default EasyButton;