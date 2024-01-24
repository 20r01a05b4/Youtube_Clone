import "./search.css"
import React from "react"
import {FaSearch} from "react-icons/fa"
const Searchbar=()=>{
    return(
        <div className="s_contanier">
                <div className="inp_div">
                <input type="text" className="s_input"/>
                </div>
                <div className="ic_div">
                <FaSearch size="20px" className="icon_s"></FaSearch>
                </div>
                
        </div>
        
    )
}
export default Searchbar
