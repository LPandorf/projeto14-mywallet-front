import Loading from "./Loading";

export default function RenderButton(props){
    const {state, text} = props;
    
    if(state===true){
        return(
            <Loading/>
        );
    }
    if(state===false){
        return(
            <>
            {text}
            </>
        );
    }
}