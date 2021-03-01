import { Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import Drawer from "../../common/Drawer/Drawer";
import "../../style.css"
import { ContextMain } from "./../../common/Drawer/ContextMain"
import axios from "axios"
import { API } from '../../common/Drawer/constant';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
export default function PrivateRoute(props: any) {
    const [userData, setUserData] = React.useState({});
    const [transData, setTransData] = React.useState({});
    const [isDrawerOpen, setDrawer] = React.useState(false);
    const mainApi = () => {
        axios.get(API.main_url).then((response: any) => {
            if (response.data) {
                setUserData(response.data.user)
                console.log("byr2", response.data.user)
            }
        }).catch((error: any) => {
            console.log("error", error)
        });

        axios.get(API.trans_url).then((response: any) => {
            if (response.data) {
                setTransData(response.data.data)
                console.log("byr", response.data.data)
            }
        }).catch((error: any) => {
            console.log("error", error)

        });
    }

    useEffect(() => {
        mainApi()
    }, [props.location.pathname])

    return (
        <Route render={() =>
            <div className="bg-grey full-len mt-3" >

                <ContextMain.Provider value={userData}>
                    <div className="max-width max-width-padd mt-4">
                        <Card className="custom-card card-dashboard">
                            <CardContent >
                                <h2>{props.location.pathname.split("/")[1]}</h2>
                                <div className="col-md-4">
                                    <Drawer />
                                </div>
                                <div className="col-md-8 mt-5">
                                    <props.component value={transData} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ContextMain.Provider>
            </ div>} />
    )

}
