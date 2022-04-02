import React from "react";
import Notes from "../components/Notes";

export const Home = (props) => {
    const { showAlert } = props;
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}
