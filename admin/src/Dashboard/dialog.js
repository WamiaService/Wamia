function Dialog({ondialog}){
    return (
        <div style={{
            position:"fixed", 
            top:"0",
            left:"0",
            right:"0",
            bottom:"0",
            backgroundColor:"rgba(0,0,0,0.5"
        }}
        >
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                position:"absolute",
                justifyCentent:"center",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)",
                background:"white",
                padding:"50px"
            }}>
                <h3>Are you sure ?</h3>
                <div style={{display:"flex",alignItems:"center"}}>
                    <button onClick={()=>ondialog(true)}  style={{background:"red",color:"white",padding:"10px",marginRight:"4px",border:"none",cursor:"pointer"}}>Yes</button>
                    <button onClick={()=>ondialog(false)} style={{background:"green",color:"white",padding:"10px",marginLeft:"4px",border:"none",cursor:"pointer"}}>No</button>
                </div>
            </div>
        </div>
    )
}
export default Dialog;