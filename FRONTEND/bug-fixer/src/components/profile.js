import React ,{Component} from 'react'
import {  Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {RETURN_USER} from "../redux/actionCreators"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import iconProfile from "../icons/iconProfile.png"



class Profile extends Component{
    constructor(){
        super();
       this.state ={
           data:[],
           users:[],
           loading : false,
           loaded: false,
           username: localStorage.getItem("username"),
           id: localStorage.getItem("id"),
           mail: localStorage.getItem("email")
           
       }
    }


    async fetchData() {
        this.setState(prevState => ({
            ...prevState,
            loading: true
        }))

        try {
            const response = await fetch("http://localhost:8001/api/teams");
            const data = await response.json();

            

            const projectsOfUser =new Array();
            const projectsforShow=new Array();
            let elem=" ";
            data.forEach(element => {
                if(element.id_user==this.state.id){
               
                elem=element.id_proiect+" ";
                projectsOfUser.push(elem)
            }
            });
            console.log(projectsOfUser);
          
            
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded: true,
                data: data,
                projectsOfUser : projectsOfUser,
                projectsforShow:projectsforShow
            }))

            
           
        }

        catch (err) {
            console.log(err);
        }


        
    }


    componentDidMount(){
        this.fetchData();
    }

    render(){
        const props=this.props;
        //console.log(props)
        if(this.props.user.user){
        
            return (
    
    
                <div style={{ backgroundColor: "#FFF6EB", height:"100%", width:"100%", minWidth:"100vw"}}>
                    <Typography id="welcomeMsg" style={{ fontFamily:"", paddingBottom: "5%", paddingTop: "1.5%" }} variant="h5" color="textPrimary"  >
    
    
                    Pagina de profil a utilizatorului
                        
    
    
                    </Typography>
    
    
                    <div className="container" style={{ height:"120vh"}}>
    
                    {/*
                      <div>
                            {this.state.data.categories.map(categorie => {
                                return (<h1 key={categorie.id_categorie}></h1>)
                            })}
                        </div>
    
                        */}
                        <div className='inLine' style={{ marginLeft:"20%",width:"30%", float:'left'}}  >
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "#FFE4C4"  }}>
                                        <TableRow>
                                            <TableCell>PROFIL USER</TableCell>
                                            {/* <TableCell align="right">ID:</TableCell> */}
    
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>


                                    {/* {
                                        
                                        this.state.loaded && this.state.users.map((row) => (
                                        <TableRow key={row.id_user  }>
                                            <TableCell  scope="row">
                                              {row.username}
                                            </TableCell>
                                            <TableCell align="right">{row.mail}</TableCell>

                                        </TableRow>
                                    ))} */}
                                     <TableRow>
                                            <TableCell>ID: {this.state.id}</TableCell>    
                                    </TableRow>
                                    <TableRow>
                                            <TableCell>Username: {this.state.username}</TableCell>    
                                    </TableRow>
                                    <TableRow>
                                            <TableCell>Email: {this.state.mail}</TableCell>    
                                    </TableRow>
                                    <TableRow>
                                            <TableCell>Proiecte: {this.state.projectsOfUser }</TableCell>    
                                    </TableRow>


                                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
    
                        </div>

                       

                        <img  id="imgIcon" style={{ float:"right", marginRight:"30%", marginTop:"1%"}} src={iconProfile}></img>



                    



                    </div>
                               
                </div>
              
    
            )}
      
    }
  
}


function mapStateToProps(state) {
    return {
       user: state
    }
}

function mapDispachToProps(dispach) {
    return {
        actions: bindActionCreators({ RETURN_USER }, dispach)
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Profile);