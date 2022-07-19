import React from "react"
import BusinessName from "../../../components/Settings/BusinessInfo/BusinessName"
const BusinessInfo = (props) => {
    return <div className={'setting-form__wrapper waitlist-setting__form'}>
                <div className={'setting-form__header'}>Business Info</div>
                <div className={'setting-form__body'}>
                    <BusinessName></BusinessName>
                </div>
            </div>
};
export default BusinessInfo;